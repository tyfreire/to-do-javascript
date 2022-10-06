class ToDo {
  constructor() {
    this.toDo = [];
  }

  addTask(activity) {
    this.toDo.push(activity);
    return true;
  }

  // showList() {
  //   return this.toDo;
  // }

  print() {
    console.log("This is your to-do list:");
    this.toDo.forEach((task) => {
      if (task.completed) {
        console.log(task.id, task.activity, "done");
      } else {
        console.log(task.id, task.activity);
      }
    });
  }
}

module.exports = ToDo;
