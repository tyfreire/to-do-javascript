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
  var entry = text + "(yes/no)";
  var answer = await askquestion(entry);

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
function printToDo(todo) {
  console.log("This is your to-do list:");

  var count = 0;
  todo.forEach((item)=> {
    if (item.completed == true){
      console.log(count, item.action, "done");
    } else {
      console.log(count, item.action);
    } 
    count++;
  });
}

function stop(){
  console.log("Ok, bye.");
  process.exit();
}

async function main() {
  let todo = [];

  var answer = await yesOrNo("Create to-do?");

  if(!answer) {
    stop();
  }

  do {
    var item = await askquestion("What is the task?");
    let new_task = Task.buildTask(item);
    todo.push(new_task);
  } while (answer = await yesOrNo("Add another task?"));

  printToDo(todo);

  var answer = await yesOrNo("Mark task as done?");
  
  if(answer) {
    do {
      var taskId = await askId("Which task number?", todo.length)
      Task.markAsDone(todo[taskId]);
    } while (answer = await yesOrNo("Mark another task?"));
  } else {
    stop();
  }

  printToDo(todo);

  process.exit();
}

main();
