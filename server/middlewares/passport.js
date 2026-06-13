import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import {getDb} from "../db/database.js";

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const db = await getDb();
      const user = await db.get("SELECT * FROM users WHERE username = ?", [
        username,
      ]);

      if (!user) {
        return cb(null, false, {
          message: "Incorrect username and/or password.",
        });
      }

      // Hash the provided password with the stored salt
      const hashedPassword = crypto
        .scryptSync(password, user.salt, 32)
        .toString("hex");

      // Compare the hashes securely
      if (
        !crypto.timingSafeEqual(
          Buffer.from(user.hashed_password, "hex"),
          Buffer.from(hashedPassword, "hex"),
        )
      ) {
        return cb(null, false, {
          message: "Incorrect username and/or password.",
        });
      }

      // Authentication successful, return the user object
      return cb(null, {id: user.id, username: user.username});
    } catch (err) {
      return cb(err);
    }
  }),
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const db = await getDb();
    const user = await db.get("SELECT id, username FROM users WHERE id = ?", [
      id,
    ]);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

export default passport;
