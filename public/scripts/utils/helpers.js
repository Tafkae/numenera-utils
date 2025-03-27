"use strict";

/**
 * Converts FormData iterator to a regular JS object.
 * Checkboxes / radio buttons etc. are represented as arrays
 * that contain all selected options.
 * @param {FormData} fd
 * @returns {Object}
 */
function formDataToObject(fd) {
  let formContents = {};
  for (let field of fd.entries()) {
    if (Object.hasOwn(formContents, field[0])) {
      if (!Array.isArray(formContents[field[0]])) {
        formContents[field[0]] = [formContents[field[0]]];
      }
      formContents[field[0]].push(field[1]);
    } else {
      formContents[field[0]] = field[1];
    }
  }
  return formContents;
}

export { formDataToObject };