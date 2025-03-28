"use strict";

import * as util from "/utils";
import { NumeneraCharacter } from "./NumeneraCharacter.js";

function getElementsAll() {
  return {
    top: document.getElementById("character-view"),
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
  };
}


document.addEventListener("DOMContentLoaded", (event) => {

});