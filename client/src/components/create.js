import React, { useState } from 'react';
import axios from 'axios';
import './create.css'; // Import the CSS file

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newTask = {
      taskName,
      taskDescription,
      time,
      isDone: false, // Default when creating a new task
    };

    try {
      // Send POST request to the backend
      await axios.post('http://localhost:5000/api/tasks', newTask);
      alert('Task created successfully!');
      // Clear form
      setTaskName('');
      setTaskDescription('');
      setTime('');
    } catch (error) {
      console.error('There was an error creating the task!', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Task Description:</label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Time (YYYY-MM-DD HH:MM):</label>
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
