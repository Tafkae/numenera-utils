"use strict";

// full directory of form elements
// (why have i done this to myself)
const el = {
  form: document.getElementById("character-form"),
  button: {
    formData: document.getElementById("btn-formData"),
    saveLocal: document.getElementById("btn-saveLocal"),
    submit: document.getElementById("btn-submit"),
    reset: document.getElementById("btn-reset"),
    import: document.getElementById("btn-import"),
    add: {
      status: document.getElementById("btn-add-status-effect"),
      attack: document.getElementById("btn-add-attack"),
      equip: document.getElementById("btn-add-equip"),
      cypher: document.getElementById("btn-add-cypher"),
      artifact: document.getElementById("btn-add-artifact"),
      tech: document.getElementById("btn-add-other-tech"),
      material: document.getElementById("btn-add-material"),
      plan: document.getElementById("btn-add-plan"),
      follower: document.getElementById("btn-add-follower"),
    },
  },
  name: document.getElementById("char-name"),
  desc: document.getElementById("char-desc"),
  type: document.getElementById("char-type"),
  focus: document.getElementById("char-focus"),
  pool: {
    might: {
      pool: document.getElementById("might-pool"),
      max: document.getElementById("might-max"),
      edge: document.getElementById("might-edge"),
    },
    speed: {
      pool: document.getElementById("speed-pool"),
      max: document.getElementById("speed-max"),
      edge: document.getElementById("speed-edge"),
      cost: document.getElementById("speed-cost"),
    },
    intellect: {
      pool: document.getElementById("intellect-pool"),
      max: document.getElementById("intellect-max"),
      edge: document.getElementById("intellect-edge"),
    },
  },
  tier: document.getElementById("tier"),
  effort: document.getElementById("max-effort"),
  xp: document.getElementById("xp"),
  adv: {
    stats: document.getElementById("adv-stats"),
    effort: document.getElementById("adv-effort"),
    edge: document.getElementById("adv-edge"),
    skill: document.getElementById("adv-skill"),
    other: document.getElementById("adv-other"),
    otherDetail: document.getElementById("adv-other-detail"),
  },
  dmgtrack: document.getElementsByName("damage-track"),
  recovery: {
    bonus: document.getElementById("recovery-bonus"),
    rolls: document.getElementsByName("recovery-rolls"),
  },
  cypherLimit: document.getElementById("cypher-limit"),
  list: {
    status: document.getElementById("list-status-effect"),
    attacks: document.getElementById("list-attack"),
    equip: document.getElementById("list-equip"),
    cypher: document.getElementById("list-cypher"),
    artifact: document.getElementById("list-artifact"),
    tech: document.getElementById("list-other-tech"),
    material: document.getElementById("list-material"),
    plan: document.getElementById("list-plan"),
    follower: document.getElementById("list-follower"),
  },
  text: {
    bkgd: document.getElementById("text-background"),
    notes: document.getElementById("text-notes"),
  },
  portrait: {
    img: document.getElementById("portrait-img"),
    file: document.getElementById("char-portrait"),
    // once an image is uploaded, access it via el.portrait.file.files
  },
};

let currentChar, nc;

// love all the hoops i have to jump through to import a JS file in the same directory
async function getNC() {
  let NumeneraCharacter = await import("./NumeneraCharacter.js");
  return NumeneraCharacter.default;
}
const ncPromise = getNC();
async function createCharacter() {
  try {
    nc = await ncPromise;
    return new nc();
  } catch (error) {
    console.error(error);
  }
}

// populate lists for top-level character options
// (type, descriptor, & focus)
async function populateMainOptions() {
  const elements = {
    descriptor: el.desc,
    type: el.type,
    focus: el.focus,
  };

  // retrieve lists from database API
  try {
    let descResponse = await getOptions("descriptor");
    let typeResponse = await getOptions("type");
    let focusResponse = await getOptions("focus");

    const mainOptions = {
      descriptor: await descResponse.json(),
      type: await typeResponse.json(),
      focus: await focusResponse.json(),
    };

    for (let key of Object.keys(mainOptions)) {
      // insert "blank" (no value) option at top of list
      let topOption = document.createElement("option");
      topOption.setAttribute("value", "");
      topOption.innerText = `(${key})`;
      elements[key].replaceChildren(topOption);

      for (let v of mainOptions[key].data) {
        let optionTag = document.createElement("option");
        optionTag.setAttribute("value", v);
        optionTag.innerText = v;
        elements[key].appendChild(optionTag);
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}

// get options from /api/v1 path
async function getOptions(listName) {
  let response = {};

  // dummy lists for testing
  switch (listName.toLowerCase()) {
    case "descriptor":
    case "descriptors":
      response = await fetch("../api/v1/descriptors");
      break;
    case "type":
    case "types":
      response = await fetch("../api/v1/types");
      break;
    case "focus":
    case "foci":
      response = await fetch("../api/v1/foci");
      break;
  }

  if (response.data) {
    return response.data;
  } else {
    return response;
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

// argument must be a NumeneraCharacter object
function formDataToNC(numaChar, fd) {
  if (!(numaChar instanceof nc)) {
    throw new Error("numaChar must be a NumeneraCharacter");
  }
  console.log(numaChar.importFormData(fd));
}

// formData to NumeneraCharacter
el.button.formData.addEventListener("click", () => {
  formDataToNC(currentChar, new FormData(el.form));
});

// Save character to LocalStorage
el.button.saveLocal.addEventListener("click", () => {
  let formContents = getFormDataObject();
  formContents.id = "test";
  window.localStorage.setItem(formContents.id, JSON.stringify(formContents));
  console.log(`Saved to local storage (ID: ${formContents.id})`);
  console.log(window.localStorage.getItem(formContents.id));
});

// populates main options once DOM loads
document.addEventListener(
  "DOMContentLoaded",
  async function () {
    console.log("DOM Content is Loaded");
    try {
      populateMainOptions();
      currentChar = await createCharacter();
      console.log(currentChar);
    } catch (error) {
      console.error(error);
    }
  },
  false
);
