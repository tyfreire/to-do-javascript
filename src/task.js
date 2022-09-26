function buildtask(item){
  return {
    action: item,
    completed: false,
  };
}

function markasdone(task){
  return task.completed = true
}

module.exports = {
  buildtask: buildtask,
  markasdone: markasdone
};
