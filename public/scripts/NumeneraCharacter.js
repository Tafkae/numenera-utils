"use strict";

// can take either an object with the desired valid keys,
// or an array with the same.
function isValidProperty(str, comparison) {
  if (Array.isArray(comparison)) {
    comparison = Object.fromEntries(comparison.map((p) => [p]));
  }
  return Object.hasOwn(comparison, str);
}

// Removes any keys from inputObj that do not exist in validObj
function discardInvalidProps(inputObj, validObj) {
  for (let prop of Object.keys(inputObj)) {
    if (!isValidProperty(prop, validObj)) {
      delete inputObj[prop];
    }
  }
  return inputObj;
}

// iterates thru FormData and returns contents as an object
function formDataToObject(fd) {
  let formContents = {};
  for (let field of fd.entries()) {
    if (Object.hasOwn(formContents, field[0])) {
      if (!Array.isArray(formContents[field[0]])) {
        if (formContents[field[0]]) {
          formContents[field[0]] = [formContents[field[0]]];
        }
      }
      if (formContents[field[0]]) {
        formContents[field[0]].push(field[1]);
      }
    } else {
      if (formContents[field[0]]) {
        formContents[field[0]] = field[1];
      }
    }
  }
  return formContents;
}

export default class NumeneraCharacter {
  // default values for all valid properties.
  // if a JSON object being passed to constructor is not structured like this,
  // it's not a valid NumeneraCharacter.
  static defaultValues = {
    id: null,
    name: "Name",
    type: "pc",
    created: Date.now(),
    lastModified: Date.now(),
    data: {
      descriptor: null,
      type: null,
      focus: null,
      tier: 1,
      effort: 1,
      xp: 0,

      // Pool points.
      might: {
        pool: 10,
        max: 10,
        edge: 0,
      },
      speed: {
        pool: 10,
        max: 10,
        edge: 0,
        effortCost: 0,
      },
      intellect: {
        pool: 10,
        max: 10,
        edge: 0,
      },

      // Special abilities (Don't include descriptions! ~Fan Use Policy)
      abilities: [
        // Foundry VTT ability structure
        // {
        //   name: "Special Ability",
        //   cost: "3 Intellect",
        //   description: "Description of the special ability.",
        // },
      ],

      // Skills
      skills: [],

      // Advancements from each tier to the next.
      advancements: {
        fromTier: {
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
        },
      },

      // Damage track can just be stored as a string.
      damageTrack: "Hale",

      // Recovery rolls (max & remaining)
      recovery: {
        bonus: 1,
        maxRolls: {
          oneAction: 1,
          tenMinutes: 1,
          oneHour: 1,
          tenHours: 1,
        },
        remainingRolls: {
          oneAction: 1,
          tenMinutes: 1,
          oneHour: 1,
          tenHours: 1,
        },
      },

      // Status effects (temporary), not populated at character creation
      statusEffects: [],

      // Attacks
      attacks: [],

      // Equipment
      equipment: [],

      // Tech: Cyphers, Artifacts, other numenera objects
      tech: {
        cyphers: [],
        artifacts: [],
        other: [],
        materials: [],
        plans: [],
      },
      followers: [],
      background: "",
      notes: "",
      portrait: null,
    },
  };

  constructor(input = NumeneraCharacter.defaultValues) {
    let jsonObj = Object.assign({}, NumeneraCharacter.defaultValues);
    try {
      // check whether input is valid JSON.
      jsonObj = Object.assign({}, JSON.parse(input));

      // discard any extra properties that don't fit the schema
      discardInvalidProps(jsonObj, NumeneraCharacter.defaultValues);
      discardInvalidProps(jsonObj.data, NumeneraCharacter.defaultValues.data);

      Object.assign(this, jsonObj);
    } catch (error) {
      if (!(error instanceof SyntaxError)) {
        console.log(error);
        console.log(jsonObj);
      }
      Object.assign(this, NumeneraCharacter.defaultValues);
    }
    if (this.id === null) {
      this.id = this.randomizeId();
    }
  }
  randomizeId() {
    return `${Math.floor(Math.random() * 89999) + 10000}`; // 5-digit random ID (but as a string)
  }

  // assigns values from FormData to this character,
  // overwriting all previous values.
  importFormData(fd) {
    if (!(fd instanceof FormData)) {
      throw new Error(`Import failed (expected FormData, received ${fd.constructor.name})`);
    }

    // extract actual data
    let data = formDataToObject(fd);

    // assign values to this character (in the correct fields)
    this.name = data["name"];

    this.data.descriptor = data["descriptor"];
    this.data.type = data["type"];
    this.data.focus = data["focus"];

    this.data.might.pool = parseInt(data["might-pool"]);
    this.data.might.max = parseInt(data["might-max"]);
    this.data.might.edge = parseInt(data["might-edge"]);
    this.data.speed.pool = parseInt(data["speed-pool"]);
    this.data.speed.max = parseInt(data["speed-max"]);
    this.data.speed.edge = parseInt(data["speed-edge"]);
    this.data.speed.cost = parseInt(data["speed-cost"]);
    this.data.intellect.pool = parseInt(data["intellect-pool"]);
    this.data.intellect.max = parseInt(data["intellect-max"]);
    this.data.intellect.edge = parseInt(data["intellect-edge"]);

    this.data.tier = parseInt(data["tier"]);
    this.data.effort = parseInt(data["max-effort"]);
    this.data.xp = parseInt(data["xp"]);

    if (Object.hasOwn(data, "advancements")) {
      if (data["advancements"].includes("adv-stats")) {
        this.data.advancements.fromTier[this.data.tier].statIncrease = {
          might: parseInt(data["adv-stats-might"]),
          speed: parseInt(data["adv-stats-speed"]),
          intellect: parseInt(data["adv-stats-intellect"]),
        };
      }
      if (data["advancements"].includes("adv-effort")) {
        this.data.advancements.fromTier[this.data.tier].effortIncrease = 1;
      }
      if (data["advancements"].includes("adv-edge")) {
        this.data.advancements.fromTier[this.data.tier].edgeIncrease = data["adv-edge-stat"];
      }
      if (data["advancements"].includes("adv-skill")) {
        this.data.advancements.fromTier[this.data.tier].skillIncrease = data["adv-skill-detail"];
      }
      if (data["advancements"].includes("adv-other")) {
        this.data.advancements.fromTier[this.data.tier].other = data["adv-other-detail"];
      }
    }

    this.data.damageTrack = data["damage-track"];
    this.data.recovery.bonus = parseInt(data["recovery-bonus"]);

    if (Object.hasOwn(data, "recovery-rolls")) {
      // checked boxes indicate a recovery roll has been used / is not remaining.
      for (let roll of Object.keys(this.data.recovery.remainingRolls)) {
        if (data["recovery-rolls"].includes(roll)) {
          this.data.recovery.remainingRolls[roll] = 0;
        }
      }
    } else {
      // if none of the boxes are checked, then all recovery rolls are available.
      Object.assign(this.data.recovery.remainingRolls, this.data.recovery.maxRolls);
    }

    this.data.cypherLimit = parseInt(data["cypher-limit"]);
    this.background = data["text-background"];
    this.notes = data["text-notes"];

    return this;
  }

  get summary() {
    return (
      `a${
        this.data.descriptor
          ? ["A", "E", "I", "O", "U"].includes(this.data.descriptor.name.charAt(0))
            ? "n"
            : ""
          : ""
      } ${this.data.descriptor ? this.data.descriptor.name : "???"} ` +
      `${this.data.type ? this.data.type.name : "???"} ` +
      `who ${this.data.focus ? this.data.focus.name : "???"}`
    );
  }

  // validates damage track value before setting it.
  set damageTrack(val) {
    if (["Hale", "Impaired", "Debilitated", "Dead"].includes(val)) {
      this.damageTrack = val;
    } else console.log(`${val} is invalid for damage track`);
  }

  addAbility(abilityObj) {
    let validKeys = ["name", "description", "staticEffects"];
    if (Object.keys(abilityObj).every((k) => validKeys.includes(k))) {
      this.data.abilities.push(abilityObj);
    }
  }

  addSkill(skillObj) {
    let validKeys = ["name", "training"];
    if (Object.keys(skillObj).every((k) => validKeys.includes(k))) {
      this.data.skills.push(skillObj);
    }
  }
}
