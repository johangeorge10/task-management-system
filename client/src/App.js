// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Homepage from './components/homepage';

function App() {
  return (
    <Router>
      <Homepage />
    </Router>
  );
}

export default App;
