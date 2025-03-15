const {Ability, Skill} = require("../../../public/scripts/gameEntities.js");

describe("Ability", () =>{
  test("class constructs properly", () => {
    expect(new Ability("Smile","3 Intellect", ":D")).toMatchObject({
      name: "Smile",
      cost: "3 Intellect",
      description: ":D"
    })
  })
});

describe("Skill", () => {
  test("class constructs properly", () => {
    expect(new Skill("Deception","Trained")).toMatchObject({name: "Deception", training: "T"});
  });

  test("constructor throws if the training level is invalid", () => {
    expect(() => new Skill("Art","clever girl")).toThrow();
  })

  test("constructor doesn't throw if the training level is valid", () => {
    expect(() => new Skill("Skillname", "Trained")).not.toThrow();
    expect(() => new Skill("Skillname", "S")).not.toThrow();
    expect(() => new Skill("Skillname", "updog")).not.toThrow();
    expect(() => new Skill("Skillname", "inconceivable")).not.toThrow();
  })

  test("improve() improves skill by one level", () => {
    let testSkill = new Skill("Medicine", "Inability");
    expect(testSkill.training).toBe("I");

    testSkill.improve();
    expect(testSkill.training).toBe("U");

    testSkill.improve();
    expect(testSkill.training).toBe("T");

    testSkill.improve();
    expect(testSkill.training).toBe("S");

    testSkill.improve();
    expect(testSkill.training).toBe("S");
  })
});