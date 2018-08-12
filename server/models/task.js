const mongoose = require('mongoose')
const Schema = mongoose.Schema

var taskSchema = new mongoose.Schema({
    task_name: {
        type: String,
        required: true,
    },
    due_date: {
        type: Date,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

var Task = mongoose.model('Task', taskSchema)

module.exports = Task