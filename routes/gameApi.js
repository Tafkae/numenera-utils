const express = require("express");
const gameApiRouter = express.Router();
const fs = require("node:fs/promises");

// game API is read-only, so only has GET routes.
const API_VERSION = "v1";

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

// handler for /v1/:category
async function categoryHandler(req, res, next) {
  res.set({
    status: 200,
    statusText: "OK",
  });
  res.body.log.params = req.params;

  let inData;
  let outData;

  switch (req.params.category) {
    case "types":
      inData = JSON.parse(await fs.readFile("./data/type.json", { encoding: "utf8" }));
      outData = Object.keys(inData.data);
      break;
    case "descriptors":
      inData = JSON.parse(await fs.readFile("./data/descriptor.json", { encoding: "utf8" }));
      outData = Object.keys(inData.data);
      break;
    case "foci":
      inData = JSON.parse(await fs.readFile("./data/focus.json", { encoding: "utf8" }));
      outData = Object.keys(inData.data);
      break;
  }
  res.body.data = outData;
  res.send(res.body);
}

// runs every time; shows info about incoming requests
gameApiRouter.use(`/${API_VERSION}/`, logApiRequests);

gameApiRouter.get(`/${API_VERSION}/:category`, categoryHandler);

module.exports = { gameApiRouter };
