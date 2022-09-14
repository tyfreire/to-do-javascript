function buildTask(item){
  return {
    action: item,
    completed: false,
  };
}

function markAsDone(task){
  return task.completed = true
}

module.exports = {
  buildTask: buildTask,
  markAsDone: markAsDone
};
