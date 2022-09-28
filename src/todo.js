class ToDo {
  constructor() {
    this.to_do = [];
  }

  add_task(activity) {
    this.to_do.push(activity);
    return true;
  }

  show_list() {
    return this.to_do;
  }
}

module.exports = ToDo;
