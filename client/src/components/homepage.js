// src/components/Homepage.js
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CreateTask from './create';
import ViewTasks from './view';
import CompletedTasks from './completed';
import './homepage.css';  // Import the CSS file

const Homepage = () => {
  return (
    <div>
      <header className="header">
        <h1>Task Management System</h1>
      </header>
      <nav className="navbar">
        <ul className="navList">
          <li className="navItem">
            <Link to="/create" className="navLink">Create Task</Link>
          </li>
          <li className="navItem">
            <Link to="/view" className="navLink">View Tasks</Link>
          </li>
          <li className="navItem">
            <Link to="/completed" className="navLink">Completed Tasks</Link>
          </li>
        </ul>
      </nav>
      <main className="content">
        <Routes>
          <Route path="/create" element={<CreateTask />} />
          <Route path="/view" element={<ViewTasks />} />
          <Route path="/completed" element={<CompletedTasks />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Task Management System</p>
      </footer>
    </div>
  );
};

export default Homepage;
