const router = require('express').Router()
const { createTask, findNotDoneTask, deleteTask, updateTask, getPriorityTask, findDoneTask ,doneTask, findOneTask } = require('../controllers/task')
const { authentication } = require('../middleware/authentication')

router.get('/notdone', authentication ,findNotDoneTask)
router.get('/done',authentication, findDoneTask)
router.get('/:id',authentication, findOneTask)
router.get('/priority/:token', getPriorityTask)
router.post('/', authentication ,createTask)
router.put('/:id',updateTask)
router.put('/done/:id', doneTask)
router.delete('/:id',deleteTask)



module.exports = router