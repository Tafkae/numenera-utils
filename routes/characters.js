const express = require("express");
const charactersRouter = express.Router();

// Handler for GET requests
function getCharacters(req, res, next) {
  res.set({
    status: 200,
    statusText: "OK",
    message: "Done",
  });
  if (req.path === '/') {
    res.render("character-list", { title: "Character List" });
  }
  else if (req.path === '/new'){
    res.render("character-sheet", { title: "New Character" });
  }
}

// Handler for POST requests
function postCharacters(req,res,next) {
  if (req.path === '/new') {
    res.set({
      status: 201,
      statusText: "Created",
      message: "Created"
    });
    // #TODO: something that actually creates a character I guess

    // then render some kinda success message

  }

  // currently that's the only route that supports POST requests.
  else {
    res.set({
      status: 405,
      statusText: "Method Not Allowed",
      allow: "GET"
    })
  }
}

/* GET list of characters in local storage */
charactersRouter.get("/", getCharacters);

/* GET blank form to create a new character */
charactersRouter.get("/new", getCharacters);

// #TODO
/* POST new character i.e. save to local storage i guess??? */
// router.post("/new", postCharacters);

module.exports = {charactersRouter, getCharacters, postCharacters};
