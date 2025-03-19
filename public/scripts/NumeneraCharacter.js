"use strict";

// can take either an object with the desired valid keys,
// or an array with the same.
function isValidProperty(str, comparison) {
  if (Array.isArray(comparison)) {
    comparison = Object.fromEntries(comparison.map((p) => [p]));
  }
  return Object.hasOwn(comparison, str);
}

function isPoolName(str) {
  return ["might", "speed", "intellect"].includes(str.toLowerCase());
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

export default class NumeneraCharacter {
  // default values for all valid properties.
  // if a JSON object being passed to constructor is not structured like this,
  // it's not a valid NumeneraCharacter.
  static defaultValues = {
    id: null,
    name: "Name",
    type: "pc",
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
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
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
        rolls: {
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
      this.id =  this.randomizeId();
    }
  }
  randomizeId (){
    return Math.floor(Math.random() * 89999) + 10000; // 5-digit random ID
  }

  // maps a field in NumeneraCharacter to its equivalent in FormData, or vice versa.
  // valid directions:
  //    "out" (NumeneraCharacter property --> HTML form field)
  //    "in"  (NumeneraCharacter property <-- HTML form field)
  mapField(name, direction) {

  }

  // set the given property to the given value (as long as both are valid.)
  // this only affects toplevel properties in "data" and also not all of them
  // (this is such a mess. what's wrong with just using the equals sign???
  //  i overcomplicated this way too much.)
  set(property, value) {
    const settableProps = [
      "name",
      "descriptor",
      "type",
      "focus",
      "tier",
      "effort",
      "xp",
      "might",
      "speed",
      "intellect",
      "damageTrack",
      "background",
      "notes",
    ];

    if (property === "name") {
      this.name = value;
    } else if (isValidProperty(property, settableProps)) {
      if (isPoolName(property)) {
        try {
          this.setPool(property, value);
        } catch (error) {
          console.log(error);
        }
      } else {
        this.data[property] = value;
      }
    }
  }

  // this one does all the type checking and coercion and stuff,
  // but obj must be an object containing the desired sub-values to change.
  // (if it isn't, it'll try to coerce a number out of it and try again)
  setPool(pool, obj) {
    if (typeof obj === "object") {
      Object.entries(obj).forEach(([key, val]) => {
        if (isValidProperty(key, NumeneraCharacter.defaultValues.data[pool])) {
          if (typeof val === "string") {
            val = parseInt(val);
          }
          if (typeof val === "number") {
            this.data[pool][key] = Math.max(0, val);
          } else {
            console.log(`${val} is not a valid value for ${pool}.${key}`);
          }
        } else {
          console.log(`${key} is not a valid property for ${pool}`);
        }
      });
    } else if (typeof obj === "string") {
      this.setPoolCurrent(pool, parseInt(obj));
    } else if (typeof obj === "number") {
      this.setPoolCurrent(pool, obj);
    } else {
      console.log(`cannot modify ${pool} pool with ${typeof obj} (${obj})`);
    }
  }

  // changes the current pool value to a number
  setPoolCurrent(pool, value) {
    if (typeof value !== "number") {
      throw new Error(
        `can't assign ${value} to ${pool}.pool (expected number, received ${typeof value})`
      );
    } else {
      this.set(pool, { pool: value });
    }
  }

  // sets maximum pool points to a number
  setPoolMax(pool, value) {
    if (typeof value !== "number") {
      throw new Error(
        `can't assign ${value} to ${pool}.max (expected number, received ${typeof value})`
      );
    } else {
      this.set(pool, { max: value });
    }
  }

  // sets Edge in a given stat to a number
  setEdge(pool, value) {
    if (typeof value !== "number") {
      throw new Error(
        `can't assign ${value} to ${pool}.edge (expected number, received ${typeof value})`
      );
    } else {
      this.set(pool, { edge: value });
    }
  }

  // validates damage track value before setting it.
  set damageTrack (val) {
    if (["Hale", "Impaired", "Debilitated", "Dead"].includes(val)) {
      this.damageTrack = val;
    } else console.log(`${val} is invalid for damage track`);
  }

  addAbility(abilityObj) {
    let validKeys = ["name", "description", "staticEffects"];
    if (Object.keys(abilityObj).every(k => validKeys.includes(k))) {
      this.data.abilities.push(abilityObj);
    }
  }

  addSkill(skillObj) {
    let validKeys = ["name", "training"];
    if (Object.keys(skillObj).every(k => validKeys.includes(k))) {
      this.data.skills.push(skillObj);
    }
  }
}
