"use strict";

class NumeneraCharacter {
  static defaultValues = {
    name: "",
    type: "pc",
    data: {
      tier: 1,
      effort: 1,
      might: {
        pool: 10,
        edge: 0,
      },
      speed: {
        pool: 10,
        edge: 0,
      },
      intellect: {
        pool: 10,
        edge: 0,
      },
      abilities: [
        {
          name: "Special Ability",
          cost: "3 Intellect",
          description: "Description of the special ability.",
        },
      ],

    },
  };

  // if the JSON string passed is valid, assign values to
  // this object.
  constructor(jsonString = NumeneraCharacter.defaultValues) {
    try {
      let jsonObj = JSON.parse(jsonString);
      Object.assign(this, jsonObj);
    } catch (error) {
      Object.assign(this, NumeneraCharacter.defaultValues);
    }
  }
}

module.exports = { NumeneraCharacter };
