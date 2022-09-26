const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(text){
  return new Promise(function(resolve, reject){
    console.log(text);
    readline.on('line', (task) => {
      resolve(task);
    });
  });
}

async function yesOrNo(text){
  var entry = text + "(yes/no)";
  var answer = await askQuestion(entry);

  if(answer == "yes") {
    return true;
  } else if(answer == "no"){
    return false;
  } else {
    console.log("Answer not valid!");
    return await yesOrNo(text);
  }
}

async function askId(text, size){
  var answer = await askQuestion(text);
  let taskId = parseInt(answer);

  if(taskId >= 0 && taskId < size) {
    return taskId;
  } else {
    console.log("Answer not valid!");
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

module.exports = {
  askQuestion: askQuestion,
  yesOrNo: yesOrNo,
  askId: askId,
  printToDo: printToDo,
  stop: stop,
};