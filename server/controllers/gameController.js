import {
  getRawNetworkData,
  getRawLeaderboard,
  getRawEvents,
  addGameScore,
} from "../dao/gameDao.js";

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await getRawLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    console.error("Leaderboard Error:", err);
    res.status(500).json({error: "Failed to fetch leaderboard"});
  }
};

const addToLeaderboard = async (req, res) => {
  try {
  } catch (err) {
    console.error("Add to leaderboard Error:", err);
    res.status(500).json({error: "Failed to add to leaderboard"});
  }
};

const getNetwork = async (req, res) => {
  try {
    const rawData = await getRawNetworkData();

    // Formatting business logic
    const network = {lines: {}, segments: []};

    rawData.forEach((row) => {
      if (!network.lines[row.lineName]) {
        network.lines[row.lineName] = [];
      }
      network.lines[row.lineName].push(row.stationName);
    });

    for (const line in network.lines) {
      const stations = network.lines[line];
      for (let i = 0; i < stations.length - 1; i++) {
        network.segments.push({
          from: stations[i],
          to: stations[i + 1],
          line: line,
        });
        network.segments.push({
          from: stations[i + 1],
          to: stations[i],
          line: line,
        });
      }
    }

    // Remove duplicates
    network.segments = network.segments.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t.from === value.from && t.to === value.to),
    );

    res.json(network);
  } catch (err) {
    console.error("Network Error:", err);
    res.status(500).json({error: "Failed to fetch network map"});
  }
};

const getRandomStations = async (req, res) => {
  try {
    const start = "test1";
    const destination = "test2";

    res.json({
      start,
      destination,
    });
  } catch (err) {
    console.error("Get Random Stations Error:", err);
    res.status(500).json({error: "Failed to get random stations"});
  }
};

const getRandomEvents = async (req, res) => {
  try {
    const {length} = req.body;

    const events = await getRawEvents();

    if (!length || length < 1) {
      return res.status(400).json({
        error: "Length must be a positive number",
      });
    }
    const randomEvents = [];
    for (let i = 0; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * events.length);
      randomEvents.push(events[randomIndex]);
    }
    res.status(200).json(randomEvents);
  } catch (err) {
    console.error("Get Random Events Error:", err);
    res.status(500).json({error: "Failed to get random events"});
  }
};

export {
  getNetwork,
  getLeaderboard,
  getRandomStations,
  getRandomEvents,
  addToLeaderboard,
};
