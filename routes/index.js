const express = require("express");
const indexRouter = express.Router();

// Handler function defined separately for ease of testing.
// See https://fek.io/blog/how-to-add-unit-testing-to-express-using-jest/

function indexHandler(req, res, next) {
  res.set({
    status: 200,
    statusText: "OK",
    message: "Done",
  });
  res.render("index", { title: "Numenera Utils", path: req.path });
}

function testHandler(req, res, next) {
  res.set({
    status: 200,
    statusText: "OK"
  });
  res.render("test");
}

function utilsHandler(req, res,next) {
  res.setHeader("content-type", "application/javascript");
  res.redirect(302, "/scripts/utils/index.js");
}

/* GET home page. */
indexRouter.get("/", indexHandler);

indexRouter.get("/test", testHandler);
indexRouter.get("/utils", utilsHandler);

module.exports = {indexRouter, indexHandler};
