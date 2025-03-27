"use strict";

// populates NumeneraCharacter from LocalStorage


// populates form from NumeneraCharacter
function ncToForm(nc) {
  el.name.value = nc.name;

  let data = nc.data;
  el.desc.value = data.descriptor.name;
  el.type.value = data.type.name;
  el.focus.value = data.focus.name;
}
