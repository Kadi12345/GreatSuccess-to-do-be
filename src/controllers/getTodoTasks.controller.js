const db = require('../db')
const Todo = db.Todo

module.exports = async function (req, res) {
  try {
    const result = [
      {
        title: 'Todo',
        tasks: await Todo.find({}).lean().exec()
      }
    ]
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
