import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './completed.css'; // CSS for styling completed tasks

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks/completed');
        setCompletedTasks(response.data); // Assuming setCompletedTasks updates your state
      } catch (error) {
        console.error('Failed to fetch completed tasks', error);
      }
    };
  
    fetchCompletedTasks();
  }, []);
  

  return (
    <div className="completed-tasks">
      <h2>Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <p>No completed tasks available</p>
      ) : (
        <ul className="task-list">
          {completedTasks.map((task) => (
            <li key={task._id} className="task-item">
              <div className="task-time">
                <span>{new Date(task.time).toLocaleDateString()}</span>
                <strong>{new Date(task.time).toLocaleTimeString()}</strong>
              </div>
              <div className="task-name">
                {task.taskName}
              </div>
              <div className="task-description">{task.taskDescription}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedTasks;
