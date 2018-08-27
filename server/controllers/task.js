const Task = require('../models/task')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
require('dotenv').config()

const createTask = (req,res) => {    
    const { task_name, due_date, priority } = req.body
    var decoded = jwt.verify(req.headers.token, process.env.jwt_secret)
    Task.create({
        task_name: task_name,
        due_date: new Date(due_date),
        userId: decoded.id,
        priority
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

const findOneTask = (req,res) => {
    Task.findOne({
        _id: req.params.id
    })
        .then((task) => {
            res.status(200).json({
                message: `task`,
                data: task
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

const findNotDoneTask = (req,res) => {
    let token = req.headers.token
    var decoded = jwt.verify(token, process.env.jwt_secret)
    Task.find({
        userId: decoded.id,
        status: false,
        priority: false
    })
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

const findDoneTask = (req,res) => {
    let token = req.headers.token
    var decoded = jwt.verify(token, process.env.jwt_secret)
    Task.find({
        userId: decoded.id,
        status: true
    })
        .then((data_tasks) => {
            res.status(200).json({
                message: `task list`,
                data: data_tasks
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

const getPriorityTask = (req,res) => {
    let token = req.params.token
    let decoded = jwt.verify(token, process.env.jwt_secret)
    Task.find({
        userId: decoded.id,
        priority: true,
        status: false
    })
        .then((tasks) => {
            res.status(200).json({
                message: `task list`,
                data: tasks
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message,
            })
        })
}

const updateTask = (req,res) => {
    const { task_name, due_date } = req.body
    console.log(req.body);
    console.log(req.params);
    Task.updateOne({
        _id: req.params.id
    }, {
        task_name: task_name, 
        due_date: due_date
    })
        .then(() => {
            res.status(201).json({
                message: `task successfully updated`,
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
        .then(() => {
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

const doneTask = (req,res) => {
    const { id } = req.params
    var decoded = jwt.verify(req.body.token, process.env.jwt_secret)
    let email_user = decoded.email
    
    Task.updateOne({
        _id: id
    }, {
        status: true
    })
        .then(() => {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                      user: 'mytodo666@gmail.com',
                      pass: 'venomous35'
                }
              });
            
                const mailOptions = {
                from: 'mytodo', // sender address
                to: `${email_user}`, // list of receivers
                subject: 'Thanks For Using My Todo', // Subject line
                html: 'thanks for using my todo! add your todo more in here <a href="http://localhost:8080/dashboard.html">mytodo.com</a>'
              };
            
              transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                    res.status(400).json({
                        message: err.message
                    })
                else
                    res.status(200).json({
                        message: `email has been sent!`
                    })
              });
            res.status(201).json({
                message: `Task Done!`
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

module.exports = {
    createTask,
    findOneTask,
    findNotDoneTask,
    findDoneTask,
    deleteTask,
    updateTask,
    getPriorityTask,
    doneTask
}