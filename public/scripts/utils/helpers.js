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
function tryParseJsonObj(str) {
  try {
    if (str.trimStart().charAt(0) !== "{") {
      return false;
    }
    let parsed = JSON.parse(str);
    return parsed;
  } catch (error) {
    return false;
  }
}

/**
 * Manages the state of an HTMLElement of class="message".
 * Used to provide feedback on user form submissions (success/fail).
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

  /**
   * Reset element's content & style
   * @param {Event} e
   */
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

  /**
   * Triggers a Failure response in the message object.
   * @param {string} msg="Failure...!" - Message to display
   * @param {number} delay=2500 - milliseconds
   * @returns {any}
   */
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

/**
 * Replaces full title of a Numenera sourcebook with its abbreviation.
 * @param {string} fullTitle
 * @returns {string}
 */
function toShortTitle (fullTitle) {
  const shortTitle = {
    // Corebooks
    "Numenera Discovery": "DI",
    "Numenera Destiny": "DE",
    "Numenera Corebook (1st ed.)": "N1e",

    // Supplements
    "Break the Horizon": "BtH",
    "Building Tomorrow": "BT",
    "Character Options 2": "CO2",
    "Character Options": "CO1",
    "Edge of the Sun": "EotS",
    "Glimmering Valley": "GV",
    "Into the Deep": "ItD",
    "Into the Night": "ItN",
    "Into the Outside": "ItO",
    "Jade Colossus": "JC",
    "Liminal Shore": "LS",
    "Ninth World Bestiary 1": "NWB1",
    "Ninth World Bestiary 2": "NWB2",
    "Ninth World Bestiary 3": "NWB3",
    "Ninth World Guidebook": "NWG",
    "Player's Guide": "PG",
    "Priests of the Aeons": "PotA",
    "Technology Compendium": "TC",
    "Torment - The Explorer's Guide": "TTeG",
    "Vertices": "Ver",
    "Voices of the Datasphere": "VotD",

    // Glimmers
    "Consent in Gaming": "CiG",
    "Exploring \"Numenera: Strand\"": "XNS",
    "Extreme Cyphers": "XC",
    "In Alternate Dimensions": "IAD",
    "In Strange Aeons": "ISA",
    "Injecting the Weird": "ItW",
    "Love and Sex in the Ninth World": "L&S",
    "Octopi of the Ninth World": "O9W",
    "Strange Creatures of the Ninth World": "SC9W",
    "Taking the Narrative by the Tail": "TNT",
    "The Nightcraft": "Ncr",
    "When Worlds Collide": "WWC",

    // Adventures
    "Ashes of the Sea": "AotS",
    "Beyond All Worlds": "BAW",
    "Escape from the Jade Colossus": "EJC",
    "Explorer's Keys": "XK",
    "Forgetting Doomsday": "FD",
    "Into the Violet Vale": "IVV",
    "Shadewalker": "SW",
    "Shards of the Looking Glass": "SLG",
    "Skein of the Blackbone Bride": "SBB",
    "Slaves of the Machine God": "SMG",
    "Spire of the Hunting Sound": "SHS",
    "The Darkest House": "DH",
    "The Devil's Spine": "TDS",
    "The Hideous Game": "THG",
    "The Nightmare Switch": "NS",
    "The Thief, the Clave, and the Ultimatum": "TCU",
    "Vortex": "Vor",
    "Weird Discoveries": "WD",
    "Where the Machines Wait": "WMW",

    // Fiction
    "Tales From the Ninth World": "Tf9W",
    "More Tales From the Ninth World": "MT9W",
    "Tales Beyond the Ninth World": "Tb9W",
    "The Night Clave": "NC",
    "The Poison Eater": "PE",
    "Tomorrow's Bones": "TB",
    "The Truth of Names": "ToN",
  };

  return shortTitle[fullTitle];
}

export { formDataToObject, tryParseJsonObj, MessageElementHandler };
