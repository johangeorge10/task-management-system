import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md'; // Import delete icon
import './view.css'; // Import the CSS for styling

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        const sortedTasks = response.data.sort((a, b) => new Date(a.time) - new Date(b.time));
        setTasks(sortedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };

    fetchTasks();
  }, []);

  // Toggle the task description display
  const toggleTaskDescription = (taskId) => {
    if (expandedTaskId === taskId) {
      setExpandedTaskId(null); // Collapse if already expanded
    } else {
      setExpandedTaskId(taskId); // Expand the clicked task
    }
  };

  // Delete a task
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId)); // Update state to remove deleted task
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  return (
    <div className="view-tasks">
      <h2>View Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <div className="task-time">
                <span>{new Date(task.time).toLocaleDateString()}</span>
                <strong>{new Date(task.time).toLocaleTimeString()}</strong>
              </div>
              <div className="task-name" onClick={() => toggleTaskDescription(task._id)}>
                {task.taskName}
              </div>
              <button className="delete-btn1" onClick={() => handleDelete(task._id)}>
                <MdDelete />
              </button>
              {expandedTaskId === task._id && (
                <div className="task-description">{task.taskDescription}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewTasks;
