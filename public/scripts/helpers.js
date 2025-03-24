"use strict";

// interactions with Localstorage API go here
export function saveLocal(numaChar) {
  // #TODO: confirm overwrite if ID collides
  localStorage.setItem(numaChar.id, JSON.stringify(numaChar));
}

// saves form contents during session (so you don't lose options if you refresh)
export function saveSession(dataObj) {
  sessionStorage.setItem("sessionChar", JSON.stringify(dataObj));
}

// iterates thru FormData and returns contents as an object
export function formDataToObject(fd) {
  let formContents = {};
  for (let field of fd.entries()) {
    if (Object.hasOwn(formContents, field[0])) {
      if (!Array.isArray(formContents[field[0]])) {
        formContents[field[0]] = [formContents[field[0]]];
      }
      formContents[field[0]].push(field[1]);
    } else {
      formContents[field[0]] = field[1];
    }
  }
  return formContents;
}