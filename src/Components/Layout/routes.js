import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/Home.component';
import RSA from '../RSA';
import Elgamal from '../Elgamal';
import Deffie from '../Deffie';
import RElgamal from '../RElgamal';


export default () => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/rsa' component={RSA} />
            <Route exact path='/elgamal' component={Elgamal} />
            <Route exact path='/diffie' component={Deffie} />
            <Route exact path='/relgamal' component={RElgamal} />
        </Switch>
    )
}