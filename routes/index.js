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

/* GET home page. */
indexRouter.get("/", indexHandler);

module.exports = {indexRouter, indexHandler};
