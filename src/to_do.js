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

async function main() {
  let todo = [];

  var answer = await yesOrNo("Create to-do?");

  if(!answer) {
    console.log("Ok, bye.")
    process.exit();
  }

  var item = await askquestion("What is the task?");
  todo.push(item);
  
  while (answer = await yesOrNo("Add another task?")) {
    var item = await askquestion("What is the task?");
    todo.push(item);
  }

  console.log('This is your to-do list:');

  todo.forEach((item)=> {
    console.log(item);
  });
  
  process.exit();
}

main();

// module.exports =

// implement mark as done for already done tasks