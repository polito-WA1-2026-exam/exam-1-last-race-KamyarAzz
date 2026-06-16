import {
  getRawNetworkData,
  getRawLeaderboard,
  getRawEvents,
  addGameScore,
} from "../dao/gameDao.js";

const buildNetworkSegments = (rawData) => {
  const lines = {};
  rawData.forEach((row) => {
    if (!lines[row.lineName]) {
      lines[row.lineName] = [];
    }
    lines[row.lineName].push({
      stationName: row.stationName,
      stopNumber: row.stop_number,
    });
  });

  const segments = new Set();
  const makeKey = (from, to) => `${from}>>>${to}`;

  for (const lineName in lines) {
    const stations = lines[lineName]
      .slice()
      .sort((a, b) => a.stopNumber - b.stopNumber)
      .map((item) => item.stationName);

    for (let i = 0; i < stations.length - 1; i++) {
      segments.add(makeKey(stations[i], stations[i + 1]));
      segments.add(makeKey(stations[i + 1], stations[i]));
    }
  }

  return segments;
};

const isRouteValid = (start, destination, segments, validSegments) => {
  if (!Array.isArray(segments) || segments.length === 0) {
    return {valid: false, error: "Route must include at least one segment."};
  }

  if (!start || !destination) {
    return {valid: false, error: "Start and destination are required."};
  }

  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];

  if (!firstSegment || !lastSegment) {
    return {valid: false, error: "Invalid route segments."};
  }

  if (firstSegment.from !== start) {
    return {
      valid: false,
      error: "Route must begin at the selected starting station.",
    };
  }

  if (lastSegment.to !== destination) {
    return {
      valid: false,
      error: "Route must end at the selected destination station.",
    };
  }

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (!segment?.from || !segment?.to) {
      return {
        valid: false,
        error: "Each segment must include a from and to station.",
      };
    }

    if (!validSegments.has(`${segment.from}>>>${segment.to}`)) {
      return {
        valid: false,
        error: `Invalid segment from ${segment.from} to ${segment.to}.`,
      };
    }

    if (i > 0) {
      const previousSegment = segments[i - 1];
      if (previousSegment.to !== segment.from) {
        return {valid: false, error: "Segments must connect sequentially."};
      }
    }
  }

  return {valid: true};
};

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await getRawLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    console.error("Leaderboard Error:", err);
    res.status(500).json({error: "Failed to fetch leaderboard"});
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
    const start = "Central Hub";
    const destination = "East Market";

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
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * events.length);
      randomEvents.push(events[randomIndex]);
    }
    res.status(200).json(randomEvents);
  } catch (err) {
    console.error("Get Random Events Error:", err);
    res.status(500).json({error: "Failed to get random events"});
  }
};

const generateRandomEvents = (events, count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * events.length);
    result.push(events[randomIndex]);
  }
  return result;
};

const calculateCoins = (baseCoins, events) => {
  return events.reduce(
    (current, event) => current + Number(event.effect || 0),
    baseCoins,
  );
};

const validateRoute = async (req, res) => {
  try {
    const {start, destination, segments} = req.body;
    const networkData = await getRawNetworkData();
    const validSegments = buildNetworkSegments(networkData);

    const routeCheck = isRouteValid(
      start,
      destination,
      segments,
      validSegments,
    );
    const baseCoins = 20;
    if (!routeCheck.valid) {
      return res.status(200).json({
        valid: false,
        reason: routeCheck.error,
        baseCoins,
        events: [],
        finalCoins: 0,
      });
    }

    const events = await getRawEvents();
    const randomEvents = generateRandomEvents(events, segments.length);
    const finalCoins = calculateCoins(baseCoins, randomEvents);

    res.status(200).json({
      valid: true,
      baseCoins,
      events: randomEvents,
      finalCoins,
    });
  } catch (err) {
    console.error("Validate Route Error:", err);
    res.status(500).json({error: "Failed to validate route."});
  }
};

const addToLeaderboard = async (req, res) => {
  try {
    const {score} = req.body;
    if (typeof score !== "number") {
      return res.status(400).json({error: "Score must be a number."});
    }

    if (!req.user?.id) {
      return res.status(401).json({error: "User must be authenticated."});
    }

    const username = req.user.username;

    await addGameScore(req.user.id, score);
    res
      .status(201)
      .json({message: "Score added to leaderboard.", username, score});
  } catch (err) {
    console.error("Add to leaderboard Error:", err);
    res.status(500).json({error: "Failed to add to leaderboard"});
  }
};

export {
  getNetwork,
  getLeaderboard,
  getRandomStations,
  validateRoute,
  addToLeaderboard,
};
