"use strict";

// this doesnt work and i don't know why OH WELL
// function confirmOverwrite (oldItem, newItem) {
//   let old = JSON.parse(oldItem);
//   return confirm(`ID ${newItem.id} already exists. Overwrite?

// Existing: ${old.name}, last modified ${old.lastModified.toLocaleString()}
// New: ${newItem.name}, last modified ${newItem.lastModified.toLocaleString()}`);
// }

// interactions with Localstorage API go here
export function saveLocal(numaChar) {
  // #TODO: confirm overwrite if ID collides
  localStorage.setItem(numaChar.id, JSON.stringify(numaChar));
}

export function saveSession(dataObj) {
  sessionStorage.setItem("sessionChar", JSON.stringify(dataObj));
}
