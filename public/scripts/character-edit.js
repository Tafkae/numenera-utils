"use strict";

// populates NumeneraCharacter from LocalStorage


// populates form from NumeneraCharacter
function ncToForm(char) {
  el.name.value = char.name;

  let data = char.data;
  el.desc.value = data.descriptor.name;
  el.type.value = data.type.name;
  el.focus.value = data.focus.name;
}


function loadCharacter(storedData) {
  return new NumeneraCharacter(storedData);
}