module.exports = {
  createTask: require('./createTask.controller'),
  moveTask: require('./moveTask.controller'),
  getTasks: require('./getTasks.controller'),
  getTasksByAuthor: require(`./getTasksByAuthor.controller`),
  deleteTask: require('./deleteTask.controller'),
  downloadFile: require('./downloadFile.controller'),
  authorsList: require('./authorsList.controller'),
}
