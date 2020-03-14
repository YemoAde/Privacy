import React, { useState } from 'react';
import bigInt from 'big-integer'

export default () => {

    const [state, setState] = useState({
        p: 65537,
        g: 3,
        message: undefined,
        pk: undefined,
        sk: undefined,
        r: undefined,
        c1: undefined,
        c2: undefined,
        dmessage: undefined
    })

    const set = object => {
        setState({ ...state, ...object })
    }

    const change = event => {
        const { name, value } = event.target
        set({ [name]: value })
    }

    const computePk = () => {
        const { sk, g, p } = state
        if (state.sk) {
            set({ pk: bigInt(g).modPow(sk, p) })
        }
    }

    const computeC1 = () => {
        const { r, g, p } = state
        if (r) {
            set({
                c1: bigInt(g).modPow(r, p)
            })
        }
    }

    const computeC2 = () => {
        const { r, p, pk, message } = state
        if (r) {
            let tempRes = bigInt(pk).modPow(r, p)
            set({
                c2: bigInt(message).multiply(tempRes)
            })
        }
    }

    const decrypt = () => {
        const { r, c1, c2, p, sk } = state
        console.log(state)
        if (r && c1 && c2) {
            let modC1 = bigInt(c1).pow(sk)
            let tempRes = bigInt(c2).divide(modC1);
            console.log(modC1, tempRes)
            set({
                dmessage: bigInt(tempRes).mod(p)
            })
        }
    }

    return (
        <>
            <div className="m-auto h-100 mt-5">
                <div className="">
                    <form className="">
                        <h5 className="text-bold">Elgamal Encryption/Decryption</h5>

                        <div class="alert alert-danger" role="alert">
                            Due to Javascript Representation of Big Integers, Kindly use values of 
                            r(random number) &le; 6 and m(message) &lt; 10000. For the same reason
                            Kindly set the value of the private key to 1 for a reasonable output.
                        </div>
                        <div className="lead">Given a large prime p=65537, a primary root g=3</div>

                        <span className="lead">Choose a private key</span>
                        <div className="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">x =</span>
                            </div>
                            <input type="number" class="form-control" placeholder="x"
                                value={state.sk}
                                onChange={e => {
                                    set({ sk: e.target.value })
                                }} />
                        </div>
                        <div className="mt-4">
                            <span className="lead">Compute the corresponding public key y = g<sup>x</sup> mod p</span>
                            <div className="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">y =</span>
                                </div>
                                <input type="number" class="form-control" placeholder="X" value={state.pk}
                                    disabled={true} />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-primary" type="button" onClick={computePk}>Compute</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="lead">Input message m</span>
                            <div className="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">m =</span>
                                </div>
                                <input type="number" class="form-control" placeholder="message"
                                    value={state.message}
                                    onChange={e => {
                                        set({ message: e.target.value })
                                    }} />
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="lead bold">Encrypt</span>
                            <div className="row  mt-4">
                                <div className="col-6">
                                    <span>Choose a random number r</span>
                                </div>
                                <div className="col-6">
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">r =</span>
                                        </div>
                                        <input type="text" class="form-control" value={state.r} name="r" onChange={change} />
                                    </div>
                                </div>
                            </div>
                            <div className="row  mt-2">
                                <div className="col-6">
                                    <span>Compute c1 = g <sup>r</sup> mod p</span>
                                </div>
                                <div className="col-6">
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">C1 =</span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="" value={state.c1} disabled />
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-primary" type="button" onClick={computeC1}>Compute</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-6">
                                    <span>Compute c2 = m *y<sup>r</sup> mod p</span>
                                </div>
                                <div className="col-6">
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">C2 =</span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="" value={state.c2} disabled />
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-primary" type="button" onClick={computeC2}>Compute</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="lead">Decryption C=(c1, c2)</span>
                            <div className="row">
                                <div className="col-6">
                                    <span>m=c2/(c1)<sup>r</sup>mod p</span>
                                </div>
                                <div className="col-6">
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">m =</span>
                                        </div>
                                        <input type="text" class="form-control form-control-sm" disabled value={state.dmessage} />
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-primary" type="button" onClick={decrypt}>Decrypt</button>
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