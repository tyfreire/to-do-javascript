const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fs = require('fs');
const path = require('path');

function askQuestion(text) {
  return new Promise(function (resolve, reject) {
    console.log(text);
    const listener = (task) => {
      readline.off("line", listener);
      resolve(task);
    }
    readline.on("line", listener);
  });
}

async function yesOrNo(text) {
  const entry = text + "(yes/no)";
  const answer = await askQuestion(entry);

  if (!['yes', 'no'].includes(answer)) {
    console.log("Answer not valid!");
    return yesOrNo(text);
  }

  return answer === "yes";
}

async function askId(text, size) {
  var answer = await askQuestion(text);
  let taskId = parseInt(answer);

  if (taskId >= 1 && taskId <= size) {
    return taskId - 1;
  } else {
    console.log("Answer not valid!");
    return askId(text, size);
  }
}

function printToDo(todo) {
  console.log("This is your to-do list:");
  todo.forEach((item, index) => {
    if (item.completed == true) {
      console.log(index + 1, "\t", item.action, "\t", "done");
    } else {
      console.log(index + 1, "\t", item.action);
    }
  });
}

function stop() {
  console.log("Ok, bye.");
  process.exit();
}

const FILE_NAME = path.resolve(__dirname, '../todo.json');

function save(todoList) {
  const content = JSON.stringify(todoList);
  fs.writeFileSync(FILE_NAME, content);
}

function load() {
  if (!fs.existsSync(FILE_NAME)) {
    return [];
  }
  const content = fs.readFileSync(FILE_NAME).toString();
  return JSON.parse(content);
}

module.exports = {
  askQuestion,
  yesOrNo,
  askId,
  printToDo,
  stop,
  load,
  save
};
