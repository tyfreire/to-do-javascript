// Fix warning message
require('events').EventEmitter.defaultMaxListeners = 0

const Task = require("../src/task");
const ToDo = require("../src/to_do");

async function main() {
  let todo = [];

  var answer = await ToDo.yesOrNo("Create to-do?");

  if(!answer) {
    stop();
  }

  do {
    var item = await ToDo.askQuestion("What is the task?");
    let new_task = Task.buildTask(item);
    todo.push(new_task);
  } while (answer = await ToDo.yesOrNo("Add another task?"));

  ToDo.printToDo(todo);

  var answer = await ToDo.yesOrNo("Mark task as done?");
  
  if(answer) {
    do {
      var taskId = await ToDo.askId("Which task number?", todo.length)
      Task.markAsDone(todo[taskId]);
    } while (answer = await ToDo.yesOrNo("Mark another task?"));
  } else {
    ToDo.stop();
  }

  ToDo.printToDo(todo);

  process.exit();
}

main();
