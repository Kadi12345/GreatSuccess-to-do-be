const db = require('../db')
const Todo = db.Todo
const Done = db.Done

module.exports = async function (req, res) {
  try {
    if (req.params.toTask === 'todo') {
      const task = await Done.findOne({_id: req.params.id}).lean().exec()
      await Todo.create(task)
      await Done.deleteOne(task)
    }
    if (req.params.toTask === 'done') {
      const task = await Todo.findOne({_id: req.params.id}).limit(100).lean().exec()
      await Done.create(task)
      await Todo.deleteOne(task)
    }
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
