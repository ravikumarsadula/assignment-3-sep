import React, { useState } from 'react';
import './styles.css'
import axios from 'axios'

const TaskItem = ({ task, setTasks, tasks }) => {

    const [currentTask, setCurrentTask] = useState({
        _id: task ? task._id : '',
        title: task ? task.title : '',
        description: task ? task.description : '',
        createdAt: task ? task.createdAt :'',
    })

    const [editMode, setEditMode] = useState(false);

    const updateTask = async () => {
        const response = await axios.put(`http://localhost:1234/api/tasks/${currentTask._id}`, currentTask)

        console.log("Upate happened successfully", response.data)
        if (response.data.success)  {
            setTasks(tasks.map(item => item._id === currentTask._id ? currentTask : item));
            setEditMode(false);
        }
    }

    const handleSubmit = () => {
        if (!editMode)  {
            setEditMode(true);
        } else {
            // edit my event by calling the API
            updateTask();
        }
    }

    const deleteTask = async () => {
        const response = await axios.delete(`http://localhost:1234/api/tasks/${currentTask._id}`)

        if (response.data.success)  {
            setTasks(tasks.filter(item => item._id !== currentTask._id))
        }
    }

    const handleDelete = () => {
        deleteTask();
    }

    const handleChange = e => {
        e.preventDefault();
        setCurrentTask({ ...task, [e.target.name]: e.target.value })
    }

    return (
        <div className="task-item">
            {
                editMode ?
                <>
                    <div className="task-item-key">
                        Title: &nbsp;
                        <input type="text" name="title" value={currentTask.title} onChange={handleChange}></input>
                    </div>
                    <div className="task-item-key">
                        Description: &nbsp;
                        <input type="text" name="description" value={currentTask.description} onChange={handleChange}></input>
                    </div>
                </>
                :
                <>
                    <h3>{task.title}</h3>
                    <p><span className="task-item-key">Description:</span> {task.description}</p>
                </>
            }

            <button onClick={handleSubmit}>{editMode ? 'Submit' : 'Edit'}</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default TaskItem;