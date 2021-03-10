const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const TaskController = require('../controllers/TaskController')
const {authentic, authorize} = require('../middlewares/auth')

router.get('/', (req, res)=>{
    res.send('Hello Kanban')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentic)
router.post('/task/create', TaskController.createTask)
router.get('/task', TaskController.fetchTask)

router.delete('/task/delete/:id', authorize, TaskController.deleteTask)

module.exports = router