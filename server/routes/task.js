const router = require('express').Router()
const { createTask, findAllTask, deleteTask, updateTask } = require('../controllers/task')
const { authentication } = require('../middleware/authentication')

router.post('/',authentication,createTask)
router.get('/', authentication, findAllTask)
router.delete('/:id', authentication, deleteTask)
router.put('/:id', authentication , updateTask)

module.exports = router