const Task = require("../src/task");

test("generates id", () => {
  let task = new Task("laundry");

  expect(task.id).toBeGreaterThanOrEqual(0);
  expect(task.id).toBeLessThanOrEqual(999);
});

describe("activity", () => {
  test("returns activity", () => {
    let task = new Task("laundry");

    expect(task.activity).toEqual("laundry");
  });
});

describe("mark as done", () => {
  test("marks task as done", () => {
    let task = new Task("laundry");

    task.markAsDone();

    expect(task.completed).toBe(true);
  });
});
