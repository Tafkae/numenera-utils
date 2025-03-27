// note: https://dev.to/dstrekelj/how-to-test-classes-with-jest-jif
const { NumeneraCharacter } = require("../../../public/scripts/NumeneraCharacter.js");

describe("constructor tests", () => {
  test("NumeneraCharacter class exists", () => {
    expect(NumeneraCharacter).toBeDefined();
  });

  test("NumeneraCharacter constructor makes a new NumeneraCharacter", () => {
    expect(new NumeneraCharacter()).toBeInstanceOf(NumeneraCharacter);
  });

  it("has all top-level properties", () => {
    let testChar = new NumeneraCharacter({ name: "Clearance" });
    expect(testChar).toHaveProperty("name");
    expect(testChar).toHaveProperty("type");
    expect(testChar).toHaveProperty("data");
  });

  test("data object has all expected properties", () => {
    let testChar = new NumeneraCharacter();
    expect(testChar.data).toBeDefined();
    expect(testChar.data).toMatchObject(NumeneraCharacter.defaultValues.data);
  });

  it("uses default values when no args are passed", () => {
    expect(new NumeneraCharacter()).toMatchObject(NumeneraCharacter.defaultValues);
  });

  it("uses default values when arg is not a JSON string", () => {
    expect(new NumeneraCharacter("this is not JSON")).toMatchObject(
      NumeneraCharacter.defaultValues
    );
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

  it("discards data properties that don't fit the schema", () => {
    let testChar = new NumeneraCharacter(
      JSON.stringify({
        name: "Tim Allen",
        age: 45,
        type: "pc",
        data: {
          tier: 3,
          battingAverage: 0.343,
        },
      })
    );
    expect(testChar.name).toBe("Tim Allen");
    expect(testChar).not.toHaveProperty("age");
    expect(testChar.data).not.toHaveProperty("battingAverage");
  });
});

// do i really need to check basic get/set things???
// i don't even have special functions for them.
// I should only be testing things that are like, not just basic value changes.
// rather, things I have to validate.
describe("getting and setting", () => {
  let testChar;

  beforeEach(() => {
    testChar = new NumeneraCharacter();
  });

  test('set & get "name" property', () => {
    testChar.set("name", "Aloysius");
    expect(testChar.name).toBe("Aloysius");
  });

  test("set & get character type (in .data only)", () => {
    testChar.set("type", "Glaive");
    expect(testChar).toHaveProperty("type", "pc");
    expect(testChar.data).toHaveProperty("type", "Glaive");
  });

  it("doesn't set properties outside the valid schema", () => {
    testChar.set("battingAverage", 0.333);
    expect(testChar).not.toHaveProperty("battingAverage");
    expect(testChar.data).not.toHaveProperty("battingAverage");
  });

  it("sets pool points according to a propertly formed object", () => {
    testChar.set("might", { pool: 15, max: 20, edge: 3 });

    expect(testChar.data.might).toMatchObject({
      pool: 15,
      max: 20,
      edge: 3,
    });
  });

  it("sets only current pool points when passed a number", () => {
    testChar.set("intellect", 15);

    expect(testChar.data.intellect).not.toBe(15);
    expect(testChar.data.intellect).toMatchObject({
      pool: 15,
      max: NumeneraCharacter.defaultValues.data.intellect.max,
      edge: NumeneraCharacter.defaultValues.data.intellect.edge,
    });
  });

  it("sets current pool points when passed a number as a string", () => {
    testChar.set("speed", "+20");
    expect(testChar.data.speed.pool).toBe(20);
  });

  it("clamps pool related values at 0", () => {
    testChar.set("intellect", -5);
    expect(testChar.data.intellect.pool).toBeGreaterThanOrEqual(0);

    testChar.set("might", -20); // even when subtract functionality is implemented, clamp at 0.
    expect(testChar.data.might.pool).toBe(0);

    testChar.set("speed", {edge: -3});
    expect(testChar.data.speed.edge).toBe(0);
  });

  it("doesn't add invalid properties to pool objects", () => {
    testChar.set("might", { effortCost: 3 });
    testChar.set("speed", { effortCost: 2 });

    expect(testChar.data).not.toHaveProperty("might.effortCost");
    expect(testChar.data.might).not.toHaveProperty("effortCost");
    expect(testChar.data.speed).toHaveProperty("effortCost", 2);
  });
});

// okay like, maybe stop with all the type checking.
// you don't have to idiot proof this, that's a stretch goal.
