const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create the Express app
const app = express();

// Middleware
app.use(cors()); // To allow cross-origin requests
app.use(express.json()); // To parse JSON bodies

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/taskdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Task Schema
const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDescription: { type: String, required: true },
  time: { type: Date, required: true },
  isDone: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

// Routes
// Create a task
app.post('/api/tasks', async (req, res) => {
  const { taskName, taskDescription, time } = req.body;
  try {
    const task = new Task({
      taskName,
      taskDescription,
      time,
      isDone: false, // default value
    });

    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send({ error: 'Failed to create task' });
  }
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ isDone: false });
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
});

// Get completed tasks
app.get('/api/tasks/completed', async (req, res) => {
  try {
    const completedTasks = await Task.find({ isDone: true });
    res.status(200).send(completedTasks);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch completed tasks' });
  }
});


// Mark task as done by ID
app.patch('/api/tasks/:id/done', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    // If task not found, return 404
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    // Check if the task is already marked as done
    if (task.isDone) {
      return res.status(400).send({ error: 'Task is already marked as done' });
    }

    // If not already done, mark the task as done
    task.isDone = true;
    await task.save();

    res.status(200).send(task);
  } catch (err) {
    res.status(500).send({ error: 'Failed to mark task as done' });
  }
});


// Delete a task by ID
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    res.status(200).send({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete task' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
