"use strict";

// const url = require("node:url");

// #TODO: hey i thought you were gonna do unit tests first

// populate lists for top-level character options
// (type, descriptor, & focus)
async function populateMainOptions() {
  const elements = {
    descriptor: document.getElementById("char-desc"),
    type: document.getElementById("char-type"),
    focus: document.getElementById("char-focus"),
  };

  // retrieve lists from database API
  const mainOptions = {
    descriptor: await getOptions("descriptor"),
    type: await getOptions("type"),
    focus: await getOptions("focus"),
  };

  for (let [key, valueList] of Object.entries(mainOptions)) {
    // insert "blank" (no value) option at top of list
    let topOption = document.createElement("option");
    topOption.setAttribute("value", "");
    topOption.innerText = `(${key})`;
    elements[key].replaceChildren(topOption);

    // populate remaining options
    for (let v of valueList) {
      let optionTag = document.createElement("option");
      optionTag.setAttribute("value", v);
      optionTag.innerText = v;
      elements[key].appendChild(optionTag);
    }
  }
}

async function getOptions(listName) {
  // dummy lists for testing
  switch (listName.toLowerCase()) {
    case "descriptor":
    case "descriptors":
      return ["Clever", "Learned", "Strong", "Swift"];
    case "type":
    case "types":
      return ["Glaive", "Nano", "Jack"];
    case "focus":
    case "foci":
      return [
        "Bears a Halo of Fire",
        "Crafts Illusions",
        "Exists Partially Out of Phase",
        "Hunts",
        "Masters Weaponry",
        "Murders",
        "Talks to Machines",
        "Works the Back Alleys",
      ];
    default:
      return ["invalid listname"];
  }

  /*
  const API_VERSION = "v1";

  // #TODO figure out how node:url works
  // and then make that construct the API call
  const listUrl = `/api/${API_VERSION}/`;

  switch (listName.toLowerCase()) {
    case "descriptor":
    case "descriptors":
      listUrl += "descriptors";
      break;
    case "type":
    case "types":
      listUrl += "types";
      break;
    case "focus":
    case "foci":
      listUrl += "foci";
      break;
    default:
      throw new Error(
        `Couldn't populate list options: ${listName} is not a valid list`
      );
  }
  // returns promise created by fetch
  return fetch(listUrl); */
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    console.log("DOM Content is Loaded");
    populateMainOptions();
  },
  false
);

// module.exports = { populateMainOptions, getOptions };
