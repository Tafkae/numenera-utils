const express = require("express");
const gameApiRouter = express.Router();
const fs = require("node:fs/promises");

// game API is read-only, so only has GET routes.
const API_VERSION = "v1";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function logApiRequests(req, res, next) {
  res.body = {
    log: {
      time: Date.now(),
      from: req.originalUrl,
      to: `/api${req.path}`,
      method: req.method,
    },
  };
  next();
}

// handler for /v1/:category - list of all options
async function categoryHandler(req, res, next) {
  res.set({
    status: 200,
    statusText: "OK",
  });
  res.body.log.params = req.params;

  let inData;
  switch (req.params.category) {
    case "types":
      inData = JSON.parse(await fs.readFile("./data/type.json", { encoding: "utf8" }));
      break;
    case "descriptors":
      inData = JSON.parse(await fs.readFile("./data/descriptor.json", { encoding: "utf8" }));
      break;
    case "foci":
      inData = JSON.parse(await fs.readFile("./data/focus.json", { encoding: "utf8" }));
      break;
  }

  res.body.data = Object.values(inData.data).map((entry) => entry.name);
  res.send(res.body);
}

// handler for /v1/:category/:name - details about a particular item
// case insensitive
async function typeHandler(req, res, next) {
  res.set({
    status: 200,
    statusText: "OK",
  });
  res.body.log.params = req.params;

  let inData;
  switch (req.params.category) {
    case "types":
      inData = JSON.parse(await fs.readFile("./data/type.json", { encoding: "utf8" }));
      break;
    case "descriptors":
      inData = JSON.parse(await fs.readFile("./data/descriptor.json", { encoding: "utf8" }));
      break;
    case "foci":
      inData = JSON.parse(await fs.readFile("./data/focus.json", { encoding: "utf8" }));
      break;
  }
  res.body.data = inData.data[capitalize(req.params.name)];
  res.send(res.body);
}

// runs every time; shows info about incoming requests
gameApiRouter.use(`/${API_VERSION}/`, logApiRequests);

// actual routing
gameApiRouter.get(`/${API_VERSION}/:category`, categoryHandler);
gameApiRouter.get(`/${API_VERSION}/:category/:name`, typeHandler);

module.exports = { gameApiRouter };
