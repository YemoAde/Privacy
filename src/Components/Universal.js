import React, { useState } from 'react';
import bigInt from 'big-integer'
import checkmark from './correct.svg';

export default () => {

    const [state, setState] = useState({
        p: 65537,
        g: 3,
        message: undefined,
        sk: 1,
        r1: undefined, r2: undefined,
        s: undefined, t: undefined,
        c1: undefined,
        c2: undefined,
        c3: undefined,
        c4: undefined,
        _c1: undefined,
        _c2: undefined,
        _c3: undefined,
        _c4: undefined,
        dmessage: undefined,
        _dmessage: undefined,
        valid: false
    })

    const [error, setError] = useState(null)

    const set = object => {
        setState({ ...state, ...object })
    }

    const change = event => {
        const { name, value } = event.target
        set({ [name]: value })
    }

    const encrypt = () => {
        setError(null)
        const { r1, r2, g, p, pk, message } = state
        if (r1 && r2 && message && pk) {
            set({
                c1: bigInt(g).modPow(r1, p),
                c2: ((bigInt(pk).modPow(r1, p)).multiply(message)).mod(p),
                c3: bigInt(g).modPow(r2, p),
                c4: bigInt(pk).modPow(r2, p),
                valid: false
            })
        } else {
            setError("Check that Public Key, r1, r2 and message are set")
        }
    }

    const reEncrypt = () => {
        setError(null)
        const { r1, r2, g, p, pk, s, t, message } = state
        if (r1 && r2 && s && t && message) {
            const tempA = r1 + r2 * s;
            const tempB = r2 * t
            set({
                _c1: bigInt(g).modPow(tempA, p),
                _c2: ((bigInt(pk).modPow(tempA, p)).multiply(message)).mod(p),
                _c3: bigInt(g).modPow(tempB, p),
                _c4: bigInt(pk).modPow(tempB, p),
                valid: false
            })
        } else {
            setError("Check that the values r1, r2, s, t and message are set")
        }
    }

    const decrypt = () => {
        const { c1, c2, _c3, _c4, p, sk } = state
        setError(null)
        try {
            const dmessage = (bigInt(c2).divide(bigInt(c1).modPow(sk, p))).mod(p)
            const _dmessage = (bigInt(_c4).divide(bigInt(_c3).modPow(sk, p))).mod(p)
            const valid = _dmessage == 1 ? true : false
            set({
                dmessage, _dmessage, valid
            })
        } catch (error) {
            setError("Encrypt and re-encrypt before decryption are set")
        }
    }

    const computePk = () => {
        const { sk, g, p } = state
        if (state.sk) {
            set({ pk: bigInt(g).modPow(sk, p) })
        }
    }

    return (
        <>
            <div className=" m-auto h-100 mt-5">
                <div className="">
                    <form className="">
                        <h5 className="text-bold">Universal Elgamal Re-encryption</h5>

                        <div className="alert alert-danger" role="alert">
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
                        {error && <div className="alert alert-danger mt-5" role="alert">{error}</div>}
                        <div className="mt-5">
                            <span className="lead bold">Choose Random Numbers r1,r2, s, t</span>
                            {/* Choose Randoms */}
                            <div className="row  mt-2 mb-5">
                                <div className="col-3">
                                    <label> Choose Random Number r1</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">r1 =</span>
                                        </div>
                                        <input type="number" class="form-control" value={state.r1} name="r1" onChange={change} />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <label> Choose Random Number r2</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">r2 =</span>
                                        </div>
                                        <input type="number" class="form-control" value={state.r2} name="r2" onChange={change} />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <label> Choose Random Number s</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">s =</span>
                                        </div>
                                        <input type="number" class="form-control" value={state.s} name="s" onChange={change} />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <label> Choose Random Number t</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">t =</span>
                                        </div>
                                        <input type="number" class="form-control" value={state.t} name="t" onChange={change} />
                                    </div>
                                </div>
                            </div>
                            {/* End of Random 
                            Computer Ciphers */}
                            <h5> Compute Ciphers(Encryption)</h5>
                            <div className="row  mt-2 mb-2">
                                <div className="col-3">
                                    <label>C1 = g<sup>r1</sup> mod p</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">C<sub>1</sub> =</span>
                                        </div>
                                        <input type="number" class="form-control" value={state.c1} />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <label>C2 = m * Y<sup>r1</sup> mod p</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">C<sub>2</sub> =</span>
                                        </div>
                                        <input type="number" class="form-control" value={state.c2} />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <label>C3 = g<sup>r2</sup> mod p</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">C <sub>3</sub> =</span>
                                        </div>
                                        <input type="number" class="form-control" value={state.c3} />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <label>C4 = Y <sup>r2</sup> mod p</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">C <sub>4</sub> =</span>
                                        </div>
                                        <input type="number" class="form-control" value={state.c4} />
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-md mt-0 mb-5" type="button" onClick={encrypt}> Compute Encryption Ciphertext</button>
                            {/* End Compute Cipher */}

                            {/* End of Cipher 
                            Computer Re-Ciphers */}
                            <h5> Compute Re-Ciphers(Re-Encryption)</h5>
                            <div className="row  mt-2 mb-2">
                                <div className="col-3">
                                    <label>C1' = = C1 * C3<sup>s</sup> = g<sup>r1 + r2 * s</sup> mod p</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">C'<sub>1</sub> =</span>
                                        </div>
                                        <input type="number" class="form-control" value={state._c1} />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <label>C2' = c2 * C4<sup>s</sup> = m * Y <sup>r1 + r2 * s</sup> mod p</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">C'<sub>2</sub> =</span>
                                        </div>
                                        <input type="number" class="form-control" value={state._c2} />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <label>C3' = C3<sup>t</sup> = g<sup>r2 * t</sup> mod p</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">C' <sub>3</sub> =</span>
                                        </div>
                                        <input type="number" class="form-control" value={state._c3} />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <label>C4' = C4<sup>t</sup> = Y <sup>r2 * t</sup> mod p</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">C' <sub>4</sub> =</span>
                                        </div>
                                        <input type="number" class="form-control" value={state._c4} />
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-md mb-5" type="button" onClick={reEncrypt}> Compute Re-Encryption Ciphertext</button>
                            {/* End Compute Re-Cipher */}

                            <h5> Compute Re-Ciphers(Re-Encryption)</h5>
                            <div className="row  mt-2 mb-2">
                                <div className="col-6">
                                    <label>Message</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">M</span>
                                        </div>
                                        <input type="number" class="form-control" value={state.dmessage} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label>Other Decryption (Should equal 1)</label>
                                    <div className="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                {state.valid && <img src={checkmark} width="20%" />}
                                            </span>
                                        </div>
                                        <input type="number" class="form-control" value={state._dmessage} />
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-md mb-5" type="button" onClick={decrypt}> Decrypt and Check if Condition for m holds</button>
                            
                            {/* End Compute Re-Cipher */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
