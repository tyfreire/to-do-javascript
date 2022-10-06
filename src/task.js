class Task {
  constructor(activity) {
    this.id = this.#generateId();
    this.activity = activity;
    this.completed = false;
  }
  markAsDone() {
    this.completed = true;
  }
  #generateId() {
    return Math.floor(Math.random() * 1000);
  }
}

module.exports = Task;
