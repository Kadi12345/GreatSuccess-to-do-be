const db = require('../db')
const Todo = db.Todo
const Done = db.Done

module.exports = async function (req, res) {
  try {
    // TODO - Some nicer solution should be put here (in long run it would make sense to keep all tasks in one table and keep the heading as a task parameter)
    
    const done_task = await Done.findById({_id: req.body._id}).lean().exec()
    if(done_task !== null) {
        await Done.deleteOne(done_task);
    }
    
    const todo_task = await Todo.findById({_id: req.body._id}).lean().exec()
    if(todo_task !== null) {
        await Todo.deleteOne(todo_task)
    }

    console.log("DONE" + done_task)
    console.log("TODO" + todo_task)


 
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
