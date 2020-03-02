import React from 'react';
import 'antd/dist/antd.css';
import Routes from './Components/Layout/routes';
import Layout from './Components/Layout'
import { BrowserRouter as Router, } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes />
    </Router>

  );
}

export default App;
