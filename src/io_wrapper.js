const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(text, read = readline) {
  return new Promise(function (resolve, reject) {
    console.log(text);
    read.on("line", (task) => {
      resolve(task);
    });
  });
}

async function yesOrNo(text, askFn = askQuestion) {
  var entry = text + "(yes/no)";
  var answer = await askFn(entry);

  if (answer == "yes") {
    return true;
  } else if (answer == "no") {
    return false;
  } else {
    console.log("Answer not valid!");
    return await yesOrNo(text, askFn);
  }
}

function stop() {
  console.log("Ok, bye.");
  process.exit();
}

module.exports = {
  askQuestion: askQuestion,
  yesOrNo: yesOrNo,
  stop: stop,
};
