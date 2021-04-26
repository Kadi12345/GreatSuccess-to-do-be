const db = require('../db')
const Todo = db.Todo
const Done = db.Done

module.exports = async function (req, res) {
  try {
    // TODO - Some nicer soultion should be put here (in long run it would make sense to keep all tasks in one table and keep the heading as a task parameter)
    const done_task = await Done.findOne({_id: req.params.id}).lean().exec()
    await Done.deleteOne(done_task)

    const todo_task = await Todo.findOne({_id: req.params.id}).limit(100).lean().exec()
    await Todo.deleteOne(todo_task)
 
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
