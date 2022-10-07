const Task = require("../src/task");
const ToDo = require("../src/to_do");

async function main() {
  let todo = ToDo.load();
  ToDo.printToDo(todo);

  let answer = await ToDo.yesOrNo("Create to-do?");

  if (answer) {
    do {
      let item = await ToDo.askQuestion("What is the task?");
      let new_task = Task.buildTask(item);
      todo.push(new_task);
      ToDo.save(todo);
    } while (answer = await ToDo.yesOrNo("Add another task?"));
  }

  ToDo.printToDo(todo);

  answer = await ToDo.yesOrNo("Mark task as done?");

  if (!answer) {
    ToDo.stop();
  }

  do {
    var taskId = await ToDo.askId("Which task number?", todo.length);
    Task.markAsDone(todo[taskId]);
    ToDo.save(todo);
  } while ((answer = await ToDo.yesOrNo("Mark another task?")));


  ToDo.printToDo(todo);

  ToDo.stop();
}

main();
