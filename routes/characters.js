const express = require("express");
const charactersRouter = express.Router();
charactersRouter.use(require("cors")());

// for GET characters/
function getCharacterList(req, res, next) {
  res.set({
    status: 200,
    statusText: "OK",
    message: "Done",
  });
  res.render("character-list", { title: "Character List", path: req.originalUrl });
}

// for GET characters/new
function getCharacterNew(req, res, next) {
  res.set({
    status: 200,
    statusText: "OK",
    message: "Done",
  });
  res.render("character-new", { title: "New Character", path: req.originalUrl });
}

// #TODO this doesn't work yet.
// For POST characters/new
// save character to cloud storage,
// then redirect to edit/:charId or view/:charId
//   ("save and continue" vs. "save")
function postCharacterNew(req, res, next) {
  res.set({
    status: 201,
    statusText: "Created",
    message: "Created",
  });

  // #TODO: API call to server for cloud storage
  // jk thats a stretch goal now

  // then go to edit
  res.redirect(201, "/edit", { title: "succeeded" });
}

// for GET characters/edit/:id
function getCharacterEdit(req, res, next) {
  let { charId } = req.params;
  res.set({
    status: 200,
    statusText: "OK",
    message: "Done",
  });
  res.render("character-edit", { title: `Editing `, path: req.originalUrl, id: charId });
}

// for GET characters/view/:id
function getCharacterView(req, res, next) {
  let { charId } = req.params;
  res.set({
    status: 200,
    statusText: "OK",
    message: "Done",
  });
  res.render("character-view", { title: `Viewing `, path: req.originalUrl, id: charId });
}

// #TODO
// for DELETE characters/edit/:id/delete
//
function deleteCharacter(req, res, next) {}

/* GET character list view */
charactersRouter.get("/", getCharacterList);

/* GET blank form to create a new character */
charactersRouter.get("/new", getCharacterNew);

/* POST new character i.e. save to cloud storage i guess??? */
charactersRouter.post("/new", postCharacterNew);

/* GET a specific character for viewing (read-only) */
charactersRouter.get("/view/:charId", getCharacterView);

/* GET a specific character for editing */
charactersRouter.get("/edit/:charId", getCharacterEdit);

/* DELETE a character from the edit screen */
charactersRouter.delete("/edit/:charId/delete", deleteCharacter);

module.exports = { charactersRouter };
