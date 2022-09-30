const Main = require("../src/main");

describe("askQuestion", () => {
  test("return string", async () => {
    let fake_readline = {
      on: (text, read) => {
        read("study");
      },
    };
    let item = await Main.askQuestion("Do you like chocolate?", fake_readline);

    expect(item).toEqual("study");
  });
});
describe("yesOrNo", () => {
  test("yes: returns true", async () => {
    let fake_fn = async function (text) {
      return "yes";
    };

    let answer = await Main.yesOrNo("Do you like popcorn?", fake_fn);

    expect(answer).toBe(true);
  });

  test("no: returns false", async () => {
    let fake_fn = async function (text) {
      return "no";
    };

    let answer = await Main.yesOrNo("Do you like popcorn?", fake_fn);

    expect(answer).toBe(false);
  });

  test("invalid input: returns message", async () => {
    let fake_answer = ["yes", "banana"];

    let fake_fn = async function (text) {
      return fake_answer.pop();
    };

    let answer = await Main.yesOrNo("Do you like popcorn?", fake_fn);

    expect(answer).toBe(true);
  });
});
