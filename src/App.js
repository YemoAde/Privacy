import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, } from 'react-router-dom';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}

export default App;
