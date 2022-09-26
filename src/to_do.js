// Fix warning message
require('events').EventEmitter.defaultMaxListeners = 0

const Task = require("../src/task");

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askquestion(text){
  return new Promise(function(resolve, reject){
    console.log(text);
    readline.on('line', (task) => {
      resolve(task);
    });
  });
}

async function yesorno(text){
  var entry = text + "(yes/no)";
  var answer = await askquestion(entry);

  if(answer == "yes") {
    return true;
  } else if(answer == "no"){
    return false;
  } else {
    console.log("Answer not valid");
    return await yesorno(text);
  }
}

async function askid(text, size){
  var answer = await askquestion(text);
  let taskid = parseInt(answer);

  if(taskid >= 0 && taskid < size) {
    return taskid;
  } else {
    console.log("Answer not valid");
    return await askid(text, size);
  }  
}

function printtodo(todo) {
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

  var answer = await yesorno("Create to-do?");

  if(!answer) {
    stop();
  }

  do {
    var item = await askquestion("What is the task?");
    let new_task = Task.buildtask(item);
    todo.push(new_task);
  } while (answer = await yesorno("Add another task?"));

  printtodo(todo);

  var answer = await yesorno("Mark task as done?");
  
  if(answer) {
    do {
      var taskid = await askid("Which task number?", todo.length)
      Task.markasdone(todo[taskid]);
    } while (answer = await yesorno("Mark another task?"));
  } else {
    stop();
  }

  printtodo(todo);

  process.exit();
}

main();
