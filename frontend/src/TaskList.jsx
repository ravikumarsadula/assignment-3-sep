import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import './styles.css'
import AddTask from './AddTask';


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [showAddTask, setshowAddTask] = useState(false);

    const fetchAllTasks = async () => {
        const response = await axios.get('http://localhost:1234/api/tasks');
        setTasks(response.data.data)
    }


    useEffect(() => {
        fetchAllTasks();
    }, [])

    const handlerAddTask = () => {
  
        setshowAddTask(true);
    }
    const closeAddTask = () => {
        setshowAddTask(false);
    };

    return (
        <div>
            { <h2>Task Manager</h2> }
          
        <button onClick={handlerAddTask}>Add Task</button>
            {showAddTask && <AddTask onClose={closeAddTask} />}
           
           
{ 
            <div className="flexbox">
            {
                tasks.map((task, _) => {
                    return (
                        <TaskItem task={task} setTasks={setTasks} tasks={tasks} />
                    )
                })
            }
            </div> }
        </div>
    )
}

export default TaskList;