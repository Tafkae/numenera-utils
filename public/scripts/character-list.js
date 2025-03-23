"use strict";

function populateCharList() {
  let list = document.getElementById("character-list");

  for (let id of Object.keys(localStorage)) {
    let charJSON = localStorage.getItem(`${id}`);
    let char = JSON.parse(charJSON);

    let item = document.createElement("li");
    item.setAttribute("class", "character-card");
    item.innerHTML =
      `<a href="/characters/view/${char.id}">` +
      `<span class="char-name">${char.name ? char.name : "???"}</span> : ` +
      `<span class="char-summary">a` +
      `${
        char.data.descriptor
          ? ["A", "E", "I", "O", "U"].includes(char.data.descriptor.name.charAt(0))
            ? "n"
            : ""
          : ""
      }` +
      ` ${char.data.descriptor ? char.data.descriptor.name : "???"} ` +
      `${char.data.type ? char.data.type.name : "???"} ` +
      `who ${char.data.focus ? char.data.focus.name : "???"}</span></a>`;
    list.appendChild(item);
  }
}

document.addEventListener("DOMContentLoaded", () => {


  populateCharList();
});
