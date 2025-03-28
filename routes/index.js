const express = require("express");
const indexRouter = express.Router();
const fs = require("node:fs/promises");
indexRouter.use(require("cors")());

// Handler function defined separately for ease of testing.
// See https://fek.io/blog/how-to-add-unit-testing-to-express-using-jest/

function indexHandler(req, res, next) {
  res.set({
    status: 200,
    statusText: "OK",
    message: "Done",
  });
  res.render("index", { title: "Numenera Utils", path: req.originalUrl });
}

function testHandler(req, res, next) {
  res.set({
    status: 200,
    statusText: "OK"
  });
  res.render("test", {title: "Testing 123", path: req.originalUrl});
}

function utilsHandler(req, res,next) {
  res.setHeader("content-type", "application/javascript");
  res.redirect(302, "/scripts/utils/index.js");
}

function legalHandler(req, res, next) {
  res.set ({
    status:200,
    statusText: "OK"
  });
  res.render("legal", {title: "Legal Stuff", path: req.originalUrl})
}

/* GET home page. */
indexRouter.get("/", indexHandler);

indexRouter.get("/test", testHandler);
indexRouter.get("/utils", utilsHandler);
indexRouter.get("/legal", legalHandler);

module.exports = {indexRouter, indexHandler};
