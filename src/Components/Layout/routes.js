import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/Home.component';
import RSA from '../RSA';


export default () => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/rsa' component={RSA} />
        </Switch>
    )
}