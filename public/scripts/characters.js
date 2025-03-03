"use strict";

const newCharButton = document.getElementById("newCharButton");
const heading = document.getElementsByTagName("h1")[0];

newCharButton.addEventListener("click", (ev) => {
  heading.innerText = `Tee-hee, stop clicking me 🤭`;
});
