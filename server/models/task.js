const mongoose = require('mongoose')
var Schema = mongoose.Schema

var taskSchema = new mongoose.Schema({
    task_name: {
        type: String,
        required: true,
    },
    due_date: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    priority: {
        type: Boolean,
        default: false
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
},{
    timestamps: true
})

var Task = mongoose.model('Task', taskSchema)

module.exports = Task