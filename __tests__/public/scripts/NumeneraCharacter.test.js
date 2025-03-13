// note: https://dev.to/dstrekelj/how-to-test-classes-with-jest-jif

const { NumeneraCharacter } = require("../../../public/scripts/NumeneraCharacter.js");

describe("constructor tests", () => {
  test("class exists", () => {
    expect(NumeneraCharacter).toBeDefined();
  });

  test("constructor makes a new NumeneraCharacter", () => {
    expect(new NumeneraCharacter()).toBeInstanceOf(NumeneraCharacter);
  });

  it("uses default values when no args are passed", () => {
    let testChar = new NumeneraCharacter();
    expect(testChar).toMatchObject(NumeneraCharacter.defaultValues);
  });

  it("uses default values when arg is not a JSON string", () => {
    let testChar = new NumeneraCharacter("this is not JSON");
    expect(testChar).toMatchObject(NumeneraCharacter.defaultValues);
  });

  it("uses provided values when arg is a JSON string", () => {
    let testChar = new NumeneraCharacter(
      JSON.stringify({
        name: "Joe Cool",
        type: "pc",
        data: {
          tier: 2,
          effort: 2,
          might: {
            pool: 15,
            current: 12,
            edge: 1,
          },
        },
      })
    );

    expect(testChar.name).toBe("Joe Cool");
    expect(testChar.data.tier).toBe(2);
  });

  it ("doesn't add properties that don't fit the schema", () => {
    let testChar = new NumeneraCharacter(
      JSON.stringify({
        name: "Tim Allen",
        type: "pc",
        data: {
          tier: 3,
          battingAverage: 0.343
        }
      })
    )

    expect(testChar.name).toBe("Tim Allen");
    expect(testChar.data).not.toHaveProperty("battingAverage");
  })
});
