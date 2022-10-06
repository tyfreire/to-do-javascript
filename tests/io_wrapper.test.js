const IOWrapper = require("../src/io_wrapper");

describe("askQuestion", () => {
  test("return string", async () => {
    let fakeReadline = {
      on: (text, read) => {
        read("study");
      },
    };
    let item = await IOWrapper.askQuestion(
      "Do you like chocolate?",
      fakeReadline
    );

    expect(item).toEqual("study");
  });
});
describe("yesOrNo", () => {
  test("yes: returns true", async () => {
    let fakeFn = async function (text) {
      return "yes";
    };

    let answer = await IOWrapper.yesOrNo("Do you like popcorn?", fakeFn);

    expect(answer).toBe(true);
  });

  test("no: returns false", async () => {
    let fakeFn = async function (text) {
      return "no";
    };

    let answer = await IOWrapper.yesOrNo("Do you like popcorn?", fakeFn);

    expect(answer).toBe(false);
  });

  test("invalid input: returns message", async () => {
    let fakeAnswer = ["yes", "banana"];

    let fakeFn = async function (text) {
      return fakeAnswer.pop();
    };

    let answer = await IOWrapper.yesOrNo("Do you like popcorn?", fakeFn);

    expect(answer).toBe(true);
  });
});
