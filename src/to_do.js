class ToDo {
  constructor() {
    this.toDo = [];
  }

  addTask(activity) {
    this.toDo.push(activity);
    return true;
  }

  showList() {
    return this.toDo;
  }
}

module.exports = ToDo;
