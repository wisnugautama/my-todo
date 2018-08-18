const router = require('express').Router()
const { createTask, findNotDoneTask, deleteTask, updateTask, getPriorityTask, findDoneTask ,doneTask, findOneTask } = require('../controllers/task')
// const { authentication } = require('../middleware/authentication')

router.get('/notdone/:token',findNotDoneTask)
router.get('/done/:token', findDoneTask)
router.get('/:id', findOneTask)
router.get('/priority/:token', getPriorityTask)
router.post('/',createTask)
router.put('/:id',updateTask)
router.put('/done/:id', doneTask)
router.delete('/:id',deleteTask)



module.exports = router