// Fix warning message
require('events').EventEmitter.defaultMaxListeners = 0

const Task = require("../src/task");

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askquestion(text){
  return new Promise(function(resolve, rej){
    console.log(text);
    readline.on('line', (task) => {
      resolve(task);
    });
  });
}

async function yesOrNo(text){
  var answer = await askquestion(text);

  if(answer == "yes") {
    return true;
  } else if(answer == "no"){
    return false;
  } else {
    console.log("Answer not valid");
    return await yesOrNo(text);
  }
}

async function askId(text, size){
  var answer = await askquestion(text);
  let taskId = parseInt(answer);

  if(taskId >= 0 && taskId < size) {
    return taskId;
  } else {
    console.log("Answer not valid");
    return await askId(text, size);
  }  
}

async function main() {
  let todo = [];

  var answer = await yesOrNo("Create to-do?");

  if(!answer) {
    console.log("Ok, bye.")
    process.exit();
  }

  var item = await askquestion("What is the task?");
  let new_task = Task.buildTask(item)
  todo.push(new_task);
  
  while (answer = await yesOrNo("Add another task?")) {
    var item = await askquestion("What is the task?");
    let new_task = Task.buildTask(item)
    todo.push(new_task);
  }

  console.log('This is your to-do list:');

  var count = 0
  todo.forEach((item)=> {
    console.log(count, item.action, item.completed);
    count++
  });

  var answer = await yesOrNo("Mark task as done?");
  
  if(answer) {
    var taskId = await askId("Which task number?", todo.length)
    Task.markAsDone(todo[taskId]);
  } else {
    console.log("Ok, bye.")
    process.exit();
  }
  console.log('This is your to-do list:');

  var count = 0
  todo.forEach((item)=> {
    console.log(count, item.action, item.completed);
    count++
  });

  process.exit();
}

main();