export const login = async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        return res.status(401).json({error: info.message});
      }

      req.login(user, (err) => {
        if (err) return next(err);
        return res.status(201).json(user);
      });
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) return next(err);
      return res.status(200).json({message: "Logout successful"});
    });
  } catch (err) {
    next(err);
  }
};

export const checkSession = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return res.status(200).json(req.user);
    } else {
      return res.status(401).json({error: "Not authenticated"});
    }
  } catch (err) {
    next(err);
  }
};

export {login, logout, checkSession};
