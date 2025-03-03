const express = require("express");
const router = express.Router();

/* GET list of characters in local storage */
router.get("/", function (req, res, next) {
  res.render("character-list", { title: "Character List" });
});

/* GET blank form to create a new character */
router.get("/new", function (req, res, next) {
  res.render("character-sheet", { title: "New Character" });
});

// #TODO
/* POST new character i.e. save to local storage i guess??? */
// router.post("/new", function (req, res, next) {
//   console.log(req.params);
// });

module.exports = router;
