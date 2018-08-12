const Task = require('../models/task')

const createTask = (req,res) => {
    const { task, date } = req.body
    Task.create({
        task_name: task,
        due_date: date
    })
        .then((data) => {
            res.status(201).json({
                message: `Successfully create a Task`,
                data: data
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
}

const findAllTask = (req,res) => {
    Task.find()
        .then((data_task) => {
            res.status(200).json({
                message: `task list`,
                data: data_task
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
}

const updateTask = (req,res) => {
    const { task, date } = req.body
    Task.updateOne({
        _id: req.params.id
    }, {
        task_name: task, 
        due_date: date
    })
        .then(() => {
            res.status(201).json({
                message: `task successfully updated`
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
}

const deleteTask = (req,res) => {
    const { id } = req.params
    Task.deleteOne({
        _id: id
    })
        .then((data) => {
            res.status(201).json({
                message: `task successfully deleted`
            })
        })
        .catch((err) => {
            res.status(200).json({
                message: err.message
            })
        })
}

module.exports = {
    createTask,
    findAllTask,
    deleteTask,
    updateTask
}