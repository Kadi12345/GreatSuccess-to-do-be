const express = require('express')
const router = express.Router()

const {  getTasks, getTasksByAuthor, createTask, moveTask, deleteTask, downloadFile, authorsList } = require('./controllers')


router.get('/tasks', getTasks)
router.get('/tasks/:author', getTasksByAuthor)
// id is mongo object _id and toTask is todo or done
router.get('/moveTask/:id/:toTask', moveTask)
router.get('/authorsList', authorsList)
router.post('/createTask', createTask)
router.delete('/deleteTask', deleteTask)
router.post('/downloadFile', downloadFile)

module.exports = router
