import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import RSA from '.';
import Elgamal from './Elgamal';
import Deffie from './Deffie';
import RElgamal from './RElgamal';
import Universal from './Universal';

export default () => {
    return (
        <div>
            <div className="container">
                <header>
                    <h1>Foundations of Privacy </h1>
                    <h4>Theory Assignment One -<button className="btn btn-lg btn-link">Click to View Code on Github</button></h4>
                    

                    <div className="links">
                        <Link to="rsa" className="quick">RSA Encryption/Decryption</Link>
                        <Link to="elgamal" className="quick">Elgamal Encryption/Decryption</Link>
                        <Link to="diffie" className="quick">Diffie Hellman</Link>
                        <Link to="relgamal" className="quick">Elgamal Re-encryption</Link>
                        <Link to="universal" className="quick">Universal Elgamal Re-encryption</Link>
                    </div>
                </header>
                <section class="solutions">
                    <Switch>
                        <Route exact path="/" component={RSA} />
                        <Route exact path='/rsa' component={RSA} />
                        <Route exact path='/elgamal' component={Elgamal} />
                        <Route exact path='/diffie' component={Deffie} />
                        <Route exact path='/relgamal' component={RElgamal} />
                        <Route exact path='/universal' component={Universal} />
                    </Switch>
                </section>
            </div>
        </div>
    );
}