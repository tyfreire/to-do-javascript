const Task = require("../src/task");

test("creates task", () => {
  let task = Task.buildtask("do the laundry");

  expect(task.action).toBe("do the laundry");
  expect(task.completed).toBe(false);
});

test("marks as done", () => {
  let task = Task.buildtask("do the laundry");

  Task.markasdone(task)

  expect(task.completed).toBe(true);
});