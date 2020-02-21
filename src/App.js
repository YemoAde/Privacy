import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import Home from './Components/Home/Home.component';

function App() {
  return (
    <Router>
       <Switch>
            <Route exact path='/' component={Home} />
        </Switch>
    </Router>
  );
}

export default App;
