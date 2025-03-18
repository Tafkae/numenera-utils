const express = require("express");
const gameApiRouter = express.Router();

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
function categoryHandler(req, res, next) {
  res.set({
    status: 200,
    statusText: "OK",
  });
  res.body.log.params = req.params;

  let outData = [];

  switch (req.params.category) {
    case "types":
      outData = ["Glaive", "Nano", "Jack"];
      break;
    case "descriptors":
      outData = ["Learned", "Clever", "Graceful", "Strong"].sort()
      break;
    case "foci":
      outData = []
      break;
  }
  res.body.data = outData;
  res.send(res.body)
}

// runs every time; shows info about incoming requests
gameApiRouter.use(`/${API_VERSION}/`, logApiRequests);

gameApiRouter.get(`/${API_VERSION}/:category`, categoryHandler);


module.exports = { gameApiRouter };
