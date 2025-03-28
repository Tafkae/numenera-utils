// re-export these functions from /utils folder.
// Note: I have a route set up so you can just say:
// import * as util from '/utils';

export * from "./storage.js";
export * from "./helpers.js";

// Material Icons Outlined
// https://fonts.google.com/icons
export const icon = {
  delete: `<span class="material-symbols-outlined">delete</span>`,
  dice: `<span class="ra ra-perspective-dice-random ra-fw"></span>`,
};