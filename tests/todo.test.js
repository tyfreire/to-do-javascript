const ToDo = require("../src/todo");
const Task = require("../src/task");

test("add task to to-do list", () => {
  let to_do = new ToDo();
  let task = new Task("study");

  expect(to_do.add_task(task)).toBe(true);
});

test("show to-do list content", () => {
  let to_do = new ToDo();
  let task = new Task("study");

  to_do.add_task(task);

  expect(to_do.show_list()).toEqual([task]);
});
