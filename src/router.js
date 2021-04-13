const express = require('express')
const router = express.Router()

const { getTodoTasks, getDoneTasks, createTask, moveTask } = require('./controllers')

router.get('/todo-tasks', getTodoTasks)
router.get('/done-tasks', getDoneTasks)
// id is mongo object _id and toTask is todo or done
router.get('/moveTask/:id/:toTask', moveTask)
router.post('/createTask', createTask)

module.exports = router
