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

/**
 * Checks whether a string is a valid JSON object,
 * and parses it if so (because why do that twice?)
 * JSON primitives will return false.
 * @param {string} str: string to parse
 * @returns {Object or boolean} returns false if string is not a JSON object
 */
const tryParseJsonObj = function (str) {
  try {
    if (str.trimStart().charAt(0) !== "{") {
      return false;
    }
    let parsed = JSON.parse(str);
    return parsed;
  } catch (error) {
    return false;
  }
};

/**
 * Manages the state of an element of class="message".
 */
class MessageElementHandler {
  /**
   * @param {HTMLElement} msgElement: element where message will be displayed.
   * @returns {} void
   */
  constructor(msgElement) {
    this.el = msgElement;
    if (!this.el.hasAttribute("class") || !this.el.classList.contains("message")) {
      this.el.classList.add("message");
    }
    this.el.addEventListener("transitionend", this);
  }

  // reset msg element when transition ends
  handleEvent(e) {
    if (e.type === "transitionend") {
      this.el.innerText = "";
      this.el.classList.remove("success", "failure");
    }
  }
  /**
   * Triggers a Success response in the message object.
   * @param {string} msg="Success!" - Message to display
   * @param {number} delay=2500 - milliseconds
   * @returns {any}
   */
  triggerSuccess(msg = "Success!", delay = 2500) {
    this.el.classList.remove("hidden");
    this.el.innerText = msg;
    this.el.classList.add("success");
    this.fadeOut(delay);
  }

  triggerFailure(msg = "Failure...", delay = 2500) {
    this.el.classList.remove("hidden");
    this.el.innerText = msg;
    this.el.classList.add("failure");
    this.fadeOut(delay);
  }

  /**
   * Fades element out after a certain delay
   * @param {number} delay in milliseconds
   * @returns {number} identifier for this Timeout
   */
  fadeOut(delay) {
    return setTimeout(() => {
      this.el.classList.add("hidden");
    }, delay);
  }
}

export { formDataToObject, tryParseJsonObj, MessageElementHandler };
