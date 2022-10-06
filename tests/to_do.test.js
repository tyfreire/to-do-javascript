const ToDo = require("../src/to_do");
const Task = require("../src/task");

test("add task to to-do list", () => {
  let toDo = new ToDo();
  let task = new Task("study");

  expect(toDo.addTask(task)).toBe(true);
});

// test("show to-do list content", () => {
//   let toDo = new ToDo();
//   let task = new Task("study");

//   toDo.addTask(task);

//   expect(toDo.showList()).toEqual([task]);
// });
