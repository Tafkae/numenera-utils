"use strict";

import * as util from "/utils";
import { NumeneraCharacter } from "/scripts/NumeneraCharacter.js";

// populate lists for top-level character options
// (type, descriptor, & focus)
async function populateMainOptions(el) {
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
  try {
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
  } catch (error) {
    console.error(error.message);
  }
}

// get details on a single option from API
async function getDetails(category, name) {
  try {
    if (!name) {
      throw new Error("No name provided");
    }
    let response = await fetch(`../api/v1/${category}/${name}`);
    response = await response.json();

    if (response.data) return response.data;
    else return response;
  } catch (error) {
    console.warn(`getDetails failed ("${category}", "${name}"): ${error.message}`);
  }
}

async function getRandomNames() {
  try {
    let response = await fetch("../api/v1/randomNames");
    response = await response.json();
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// full directory of form elements
// (why have i done this to myself)
function getFormElementsAll() {
  return {
    form: document.getElementById("character-form"),
    button: {
      random: {
        all: document.getElementById("btn-random-all"),
        name: document.getElementById("btn-random-name"),
      },
      saveLocal: document.getElementById("btn-saveLocal"),
      reset: document.getElementById("btn-reset"),
      export: document.getElementById("btn-export"),
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
    syw: {
      might: {
        pool: document.getElementById("syw-might-pool"),
        max: document.getElementById("syw-might-max"),
        edge: document.getElementById("syw-might-edge"),
      },
      speed: {
        pool: document.getElementById("syw-speed-pool"),
        max: document.getElementById("syw-speed-max"),
        edge: document.getElementById("syw-speed-edge"),
        cost: document.getElementById("syw-speed-cost"),
      },
      intellect: {
        pool: document.getElementById("syw-intellect-pool"),
        max: document.getElementById("syw-intellect-max"),
        edge: document.getElementById("syw-intellect-edge"),
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
      assign: {
        start: document.getElementById("pool-assign-start"),
        remaining: document.getElementById("pool-assign-remaining"),
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
}

function addSkill(list,skillObj) {

}

function addListItem(list, itemObj) {
  switch (list.id) {
    case "list-skill":
      addSkill(list);
      break;
    case "abilities":
      break;
    case "attacks":
      break;
    case "equip":
      break;
    case "cyphers":
      break;
    default:
      console.warn(`Couldn't add item ${itemObj.name} to section#${section.id}`);
  }
}

function removeListItem(item) {

}

// main stuff (wait for DOM to load first)
document.addEventListener(
  "DOMContentLoaded",
  async function () {
    const el = getFormElementsAll();
    populateMainOptions(el);
    let currentChar = new NumeneraCharacter();

    // EVENT LISTENERS FOR DAYS =======================================
    el.button.reset.addEventListener("click", () => {
      currentChar = new NumeneraCharacter();
      sessionStorage.clear();
    });

    // Save character to LocalStorage
    el.button.saveLocal.addEventListener("click", (event) => {
      event.preventDefault();
      currentChar.importFormData(new FormData(el.form));
      util.saveLocal(currentChar.id, JSON.stringify(currentChar));
    });

    // retrieves details for descriptor
    el.desc.addEventListener("change", async function () {
      currentChar.data.descriptor = await getDetails("descriptors", el.desc.value);
    });

    // retrieves details for type, populates starting stats
    el.type.addEventListener("change", async function () {
      let type = await getDetails("types", el.type.value);

      currentChar.data.type = type;

      el.pool.might.max.value = type.startingStats.might;
      el.pool.might.max.min = type.startingStats.might;
      el.pool.might.pool.value = type.startingStats.might;
      el.pool.might.edge.value = type.startingStats.edge.might || 0;

      el.pool.speed.max.value = type.startingStats.speed;
      el.pool.speed.max.min = type.startingStats.speed;
      el.pool.speed.pool.value = type.startingStats.speed;
      el.pool.speed.edge.value = type.startingStats.edge.speed || 0;
      el.pool.speed.cost.value = type.startingStats.speed.cost || 0;

      el.pool.intellect.max.value = type.startingStats.intellect;
      el.pool.intellect.max.min = type.startingStats.intellect;
      el.pool.intellect.pool.value = type.startingStats.intellect;
      el.pool.intellect.edge.value = type.startingStats.edge.intellect || 0;

      currentChar.importFormData(new FormData(el.form));
    });

    // retrieves details for focus
    el.focus.addEventListener("change", async function () {
      currentChar.data.focus = await getDetails("foci", el.focus.value);
    });

    // makes pool value (current) equal pool value (max) anytime max is changed.
    // this is only really useful during character creation I think.
    // #TODO maybe: add toggle button for whether to keep them synced
    ["might", "speed", "intellect"].forEach((stat) => {
      el.pool[stat].max.addEventListener("change", () => {
        el.pool[stat].pool.max = el.pool[stat].max.value;
        el.pool[stat].pool.value = el.pool[stat].max.value;
      });
    });

    // chooses a random name from external API
    let nameList = [];
    el.button.random.name.addEventListener("click", async () => {
      if (nameList.length === 0) {
        nameList = await getRandomNames();
      }
      el.name.value = nameList.pop();
    });

    // updates NC object from form data every time something changes
    // i think this has to run AFTER all the other event listeners.
    el.form.addEventListener("change", () => {
      currentChar.importFormData(new FormData(el.form));
      console.log(currentChar);
    });
  },
  false
);
