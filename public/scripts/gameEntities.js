"use strict";

// NOTE: not sure this file needs to exist.

// Defines several classes for game entities of Numenera.
// e.g. what is an ability? what is a skill? etc.

class Pool {}

class Ability {
  // all inputs to constructor will be Strings.
  constructor(name, cost, description) {
    this.name = name;
    this.cost = cost;
    this.description = description;
  }
}

class Skill {
  constructor(name, training = "T") {
    this.name = name;

    // typical values:
    // "S" == "Specialized"
    // "T" == "Trained"
    // "U" == "Untrained"
    // "I" == "Inability"
    if (training.match(/^[SsTtUuIi]/)) {
      this.training = training.charAt(0).toUpperCase();
    } else {
      throw new Error("Invalid Training level");
    }
  }

  // Improve training level by one step
  // I -> U -> T -> S
  improve() {
    switch (this.training) {
      case "I":
        this.training = "U";
        break;
      case "U":
        this.training = "T";
        break;
      case "T":
        this.training = "S";
        break;
    }
  }
}

class Advancement {}

class DamageTrack {}

class Recovery {}

class StatusEffect {}

class Attack {}

class Item {
  constructor(name, quantity, level = -1, description = "") {
    this.name = name;
    this.quantity = quantity;
    this.level = level;
    this.description = description;
  }
}

class WeaponItem extends Item {
  constructor(name, quantity, weight, level = -1, description = "") {
    super(name, quantity, level, description);
    this.weight = weight;
  }
}

class ArmorItem extends Item {}

class Cypher extends Item {
  constructor(name, quantity, level = 1, description = "") {
    super(name, quantity, level, description);
  }
}

class Artifact extends Cypher {}

class CraftMaterial extends Item {}

class NumeneraPlan extends Item {}

class NPC {
  constructor(name, level) {
    this.name = name;
    this.level = typeof level === "string" ? parseInt(level) : level;
  }
}

module.exports = { Skill, Ability };
