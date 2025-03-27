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

// #TODO: copy over success-failure confirmation messages from test.js
function setupSuccessFailMsg(msgElement, successMsg, failureMsg){

}


/* const setSuccess = function (index, msgList) {
  msgList[index].classList.remove("hidden");
  msgList[index].innerText = "Success!";
  msgList[index].classList.add("success");
};

const setFailure = function (index, msgList) {
  msgList[index].classList.remove("hidden");
  msgList[index].innerText = "Failed...";
  msgList[index].classList.add("failure");
};

const fadeOut = function (index, msgList) {
  setTimeout(() => {
    msgList[index].classList.add("hidden");
  }, 2500);
}; */

export { formDataToObject };