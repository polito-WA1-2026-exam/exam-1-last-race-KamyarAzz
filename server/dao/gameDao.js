import {getDb} from "../db/database.js";

const getRawLeaderboard = async () => {
  const db = await getDb();
  const query = `
    SELECT users.username, MAX(games.score) as bestScore 
    FROM games 
    JOIN users ON games.user_id = users.id 
    GROUP BY users.id 
    ORDER BY bestScore DESC
  `;
  return await db.all(query);
};

const getRawNetworkData = async () => {
  const db = await getDb();
  const query = `
    SELECT lines.name as lineName, stations.name as stationName, line_stations.stop_number
    FROM line_stations
    JOIN lines ON line_stations.line_id = lines.id
    JOIN stations ON line_stations.station_id = stations.id
    ORDER BY lines.name, line_stations.stop_number
  `;
  return await db.all(query);
};

const getRawEvents = async () => {
  const db = await getDb();
  const query = `
    SELECT * FROM events
  `;
  return await db.all(query);
};

const addGameScore = async (user_id, score) => {
  const db = await getDb();

  return db.run("INSERT INTO games (user_id, score) VALUES (?, ?)", [
    user_id,
    score,
  ]);
};

export {getRawNetworkData, getRawLeaderboard, getRawEvents, addGameScore};
