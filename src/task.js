class Task {
  constructor(activity) {
    this.id = this.#generate_id();
    this.activity = activity;
    this.completed = false;
  }
  markAsDone() {
    this.completed = true;
  }
  #generate_id() {
    return Math.floor(Math.random() * 1000);
  }
}

module.exports = Task;
