const Task = require("../src/task");
const ToDo = require("../src/to_do");
const IOWrapper = require("../src/io_wrapper");

async function cli() {
  let toDo = new ToDo();
  var answer = await IOWrapper.yesOrNo("Create to-do?");

  if (!answer) {
    IOWrapper.stop();
  }

  do {
    let item = await IOWrapper.askQuestion("What is the task?");
    let task = new Task(item);

    toDo.addTask(task);
  } while ((answer = await IOWrapper.yesOrNo("Add another task?")));

  toDo.print();
}

module.exports = {
  cli: cli,
};
