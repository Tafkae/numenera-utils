const { indexHandler } = require("../../routes/index");

let req,res;

describe("indexHandler", () => {

  beforeEach(() => {
    // ARRANGE - setup test data / mocks
    req = {};
    res = {
      status: null,
      statusText: null,
      message: null,
      options: {},
      set(obj) {
        Object.assign(this, obj);
      },
      render(templateName, options) {
        this.body = templateName;
        this.options = options;
      },
    };
  });

  test("responds to / (GET)", () => {
    // ACT - run the thing being tested
    indexHandler(req, res);

    // ASSERT - specify expected results
    expect(res.options.title).toEqual("Numenera Utils");
    expect(res.status).toBe(200);
    expect(res).toHaveProperty('body');
    });
});
