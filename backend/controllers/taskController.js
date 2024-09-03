const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks1 = await Task.find({ isDeleted: false });

        res.status(200).json({
            success: true,
            data: tasks1
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.createTask = async (req, res) => {
    const { title, description,createAt} = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            createAt
        })

        await newTask.save();

        res.status(201).json({
            success: true,
            data: newTask
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.updateTask = async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const task = await Task.findByIdAndUpdate(id, body);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "No such even exists in the database"
            })
        }

        res.status(200).json({
            success: true,
            data: body
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        // soft delete
        const task = await Task.findByIdAndUpdate(id, { isDeleted: true })

        task.isDeleted = true

        res.status(200).json({
            success: true,
            data: task
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}