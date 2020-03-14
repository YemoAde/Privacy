import React, { useState } from 'react';
import Rsa from '../Algorithms/rsa';

export default () => {

    const [val, setValue] = useState(
        {
            p: 0,
            q: 0,
            n: null,
            phi: null,
            pk: null,
            sk: null,
            message: null,
            cipher: null,
            dmessage: null
        }
    );


    const set = obj => {
        setValue({ ...val, ...obj })
    }

    const generatePrimes = () => {
        const [p, q] = Rsa.generatePQ()
        set({ p, q })
    }

    const computePk = () => {
        const { p, q } = val
        const phi = (p - 1) * (q - 1)
        const n = p * q
        const e = Rsa.calculatePublicKey(p, q)
        console.log(e)


        set({ n, pk: e, phi })
        console.log(val)
    }

    const computeSk = () => {
        const sk = Rsa.getPrivateKey(val.pk, val.phi)
        set({ sk })
    }

    const encrypt = () => {
        const cipher = Rsa.encrypt(val.message, val.pk, val.n)
        set({ cipher })
    }

    const decrypt = () => {
        const dmessage = Rsa.decrypt(val.cipher, val.sk, val.n)
        set({ dmessage })
    }

    return (
        <>
            <div className="card" className="">
                <h5 className="text-bold">Question 1 - RSA Algorithm</h5>
                <form>
                    <h5>Generating prime numbers p and q</h5>
                    <div class="form-row">
                        <div class="col">
                            <label>Value of P</label>
                            <input type="number" class="form-control" placeholder="P" disabled value={val.p} />
                        </div>
                        <div class="col">
                            <label>Value of Q</label>
                            <input type="number" class="form-control" placeholder="Q" disabled value={val.q} />
                        </div>
                        <div class="col">
                            <button type="button" className="btn btn-primary mt-4" onClick={generatePrimes}>Generate</button>
                        </div>
                    </div>

                    <h5 className="mt-3">Computing n=pq</h5>
                    <div class="form-row">
                        <div class="col">
                            <label>Value of n</label>
                            <input type="number" class="form-control" placeholder="n" value={val.n} />
                        </div>
                        <div class="col">
                            <button type="button" className="btn btn-primary mt-4" onClick={computePk}>Compute</button>
                        </div>
                    </div>

                    <h5 className="mt-3">Key Generation</h5>
                    <div class="form-row">
                        <div class="col">
                            <label>Set Public Key e</label>
                            <input type="number" class="form-control" placeholder="e" value={val.pk} />
                        </div>
                        <div class="col">
                            <label>Calculate Private Key d</label>
                            <input type="number" class="form-control" placeholder="d" value={val.sk} />
                        </div>
                        <div class="col">
                            <button type="button" className="btn btn-primary mt-4" onClick={computeSk}>Compute Private Key</button>
                        </div>
                    </div>

                    <h5 className="mt-3">Input Message</h5>
                    <div class="form-row">
                        <div class="col">
                            <label>Message m</label>
                            <input type="number" class="form-control" placeholder="m" value={val.message}
                                onChange={e => set({ message: parseInt(e.target.value) })} />
                        </div>
                    </div>

                    <h5 className="mt-3">Encryption</h5>
                    <div class="form-row">
                        <div class="col">
                            <p>Encrypt c = m<sup>e</sup> mod n</p>
                        </div>
                        <div class="col">
                            <label>Ciphertext C</label>
                            <input type="text" class="form-control" placeholder="c" value={val.cipher} />
                        </div>
                        <div class="col">
                            <button type="button" onClick={encrypt} className="btn btn-primary mt-4">Encrypt</button>
                        </div>
                    </div>
                    <h5 className="mt-3">Decryption</h5>
                    <div class="form-row">
                        <div class="col">
                            <p>Decrypt d = c<sup>d</sup> mod n</p>
                        </div>
                        <div class="col">
                            <label>Message</label>
                            <input type="text" class="form-control" placeholder="m" value={val.dmessage} />
                        </div>
                        <div class="col">
                            <button type="button" onClick={decrypt} className="btn btn-primary mt-4">Decrypt</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}