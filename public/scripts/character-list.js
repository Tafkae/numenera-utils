"use strict";

import * as util from "/utils";

const typeIcon = {
  Arkus: "ra-crown",
  Delve: "ra-compass",
  Glaive: "ra-battered-axe",
  Glint: "ra-fox",
  Jack: "ra-knife",
  Nano: "ra-reactor",
  Seeker: "ra-telescope",
  Wright: "ra-wrench",
};

function populateCharList() {
  const el = {
    ul: document.getElementById("character-list"),
    li: document.querySelector("ul#character-list > li.menu-item"),
  };
  // detach list item w/o deleting it
  el.ul.removeChild(el.li);

  for (let id of Object.keys(localStorage)) {
    let charJSON = util.loadLocal(`${id}`);
    let char = util.tryParseJsonObj(charJSON);

    let newLi = el.li.cloneNode(true);
    let newA = newLi.children[0];
    newA.setAttribute("href", `/characters/view/${id}`);

    let menuIcon = newA.children[0].children[0].children[0];
    if (char.data.type && Object.keys(typeIcon).includes(char.data.type.name)) {
      menuIcon.classList.add(typeIcon[char.data.type.name]);
    } else {
      menuIcon.classList.add("ra-player");
    }
    menuIcon.classList.add("ra-2x", "ra-fw");

    let menuText = newA.children[0].children[1];
    menuText.children[0].innerText = char.name;
    menuText.children[1].innerText =
      `a${
        char.data.descriptor
          ? ["A", "E", "I", "O", "U"].includes(char.data.descriptor.name.charAt(0))
            ? "n"
            : ""
          : ""
      } ${char.data.descriptor ? char.data.descriptor.name : "???"} ` +
      `${char.data.type ? char.data.type.name : "???"} ` +
      `who ${char.data.focus ? char.data.focus.name : "???"}`;

    el.ul.appendChild(newLi);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateCharList();
});
