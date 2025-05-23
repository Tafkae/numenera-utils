"use strict";

/**
 * Save a string to LocalStorage.
 * @param {string} key
 * @param {string} str: if JSON, needs to be stringified already
 * @returns {boolean} true if it saved without errors, false otherwise
 */
const saveLocal = function (key, str) {
  try {
    localStorage.setItem(key, str);
    // check for success
    if (localStorage.getItem(key) === str) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};


/**
 * Loads a string from storage.
 * @param {string} key
 * @returns {string}
 */
const loadLocal = function (key) {
  let str;
  try {
    str = localStorage.getItem(key);
    if (str === null) {
      console.warn(`No such entry in LocalStorage for key ${key}`)
    }
    return str;
  }
  catch (error) {
    console.error(error);
    return null;
  }
};



export {saveLocal, loadLocal};