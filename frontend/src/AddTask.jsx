import React, { useState } from 'react';
import './styles.css'
import axios from 'axios'

function AddTask({onClose}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [createdAt, setCreatedAt]= useState('');
    
    const handleTiltleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handleCreatedAtChange=(e)=>{
        setCreatedAt(e.target.value)
    }

    const PostTask = async () => {
        const payload ={
            title:title,
            description: description,
            createdAt: createdAt
        }
        const response =await axios.post('http://localhost:1234/api/tasks',payload)
        console.log(response)  
    }
    const AddTask = () => {
        PostTask();
        onClose();
    }
  
    return (
        
        <div className="task-item">

                    <div className="task-item-key">
                        Title: &nbsp;
                        <input type="text" name="title" value={title} onChange={handleTiltleChange} ></input>
                    </div>
                    <div className="task-item-key">
                        Description: &nbsp;
                        <input type="text" name="description" value={description} onChange={handleDescriptionChange}></input>
                    </div>
                    <div className="task-item-key">
                        Created At: &nbsp;
                        <input type="text" name="createdAt" value={createdAt} onChange={handleCreatedAtChange}></input>
                    </div>

                    <button onClick={AddTask}>AddSubmit</button>

                
              
        

        </div>
    
  )
}

export default AddTask

