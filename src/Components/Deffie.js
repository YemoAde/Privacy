import React, { useState } from 'react';
import bigInt from 'big-integer';

export default () => {

    const [state, setState] = useState({
        g: 2,
        p: 65537,
        x: undefined,
        y: undefined,
        Y: undefined,
        X: undefined,
        Kx: undefined,
        Ky: undefined
    })

    const set = object => {
        setState({ ...state, ...object })
    }

    const calculateKx = () => {
        const { x, y, X, Y, p } = state
        if (x && y && X && Y) {
            set({
                Kx: bigInt(X).modPow(y, p)
            })
        }
    }
    const calculateKy = () => {
        const { x, y, X, Y, p } = state
        if (x && y && X && Y) {
            set({
                Ky: bigInt(Y).modPow(x, p)
            })
        }
    }

    const calculateX = () => {

        const { x, g, p } = state
        if (x > 0) {
            let result = bigInt(g).modPow(x, p)
            set({ X: result })
        }
    }
    const calculateY = () => {
        const { y, g, p } = state
        if (y > 0) {
            let result = bigInt(g).modPow(y, p)

            set({ Y: result })
        }
    }
    return (
        <>
            <div className="">
                <div className="">
                    <form className="">
                        <h5 className="text-bold">Diffie Hellman Exchange Key</h5>
                        <div className="lead">Given a large prime p=65537, a primary root g=3</div>

                        <span className="lead">Choose a random number x</span>
                        <div className="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">x =</span>
                            </div>
                            <input type="number" class="form-control" placeholder="x"
                                value={state.x}
                                onChange={e => {
                                    set({ x: e.target.value })
                                }} />
                        </div>
                        <div className="mt-4">
                            <span className="lead">Compute X = g<sup>x</sup> mod p</span>
                            <div className="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">X =</span>
                                </div>
                                <input type="number" class="form-control" placeholder="X" value={state.X} 
                                disabled={true}/>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-primary" type="button" onClick={calculateX}>Compute</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="lead">Choose a random number y</span>
                            <div className="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">y =</span>
                                </div>
                                <input type="text" class="form-control" placeholder="y"
                                    value={state.y}
                                    onChange={e => {
                                        set({ y: e.target.value })
                                    }} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="lead">Compute Y = g<sup>y</sup> mod p</span>
                            <div className="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Y =</span>
                                </div>
                                <input type="text" disabled class="form-control" placeholder="Y" value={state.Y} />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-primary" type="button" onClick={calculateY}>Compute</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="lead">Calculate Session Key Compute K = g<sup>xy</sup> mod p</span>
                            <div className="row">
                                <div className="col-6">
                                    <div className="mt-4">
                                        <span className="lead">Compute K = Y<sup>x</sup> mod p</span>
                                        <div className="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">K =</span>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Y" value={state.Ky} />
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-primary" type="button" onClick={calculateKy}>Compute</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mt-4">
                                        <span className="lead">Compute K = X<sup>y</sup> mod p</span>
                                        <div className="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">K =</span>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Y" value={state.Kx} />
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-primary" type="button" onClick={calculateKx}>Compute</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}