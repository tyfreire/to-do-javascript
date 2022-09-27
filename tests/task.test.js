const Task = require("../src/task");

test("creates task", () => {
  let task = Task.buildTask("do the laundry");

  expect(task.action).toBe("do the laundry");
  expect(task.completed).toBe(false);
});

test("marks as done", () => {
  let task = Task.buildTask("do the laundry");

  Task.markAsDone(task);

  expect(task.completed).toBe(true);
});
