import bigInt from 'big-integer';

class Rsa {

    static isPrime(num) {
        let nums = [2, 3, 4, 5, 7];
        for (let i = 0; i < nums.length; i++) {
            if (num % nums[i] == 0 && num != nums[i]) {
                return false
            }
        }
        return true;
    }

    static gcd(x, y) {
        if (y == 0) return x;
        return this.gcd(y, x % y)
    }

    static generatePrime() {
        let val = 0;
        while (!this.isPrime(val)) {
            val = ~~(Math.random() * (100 - 50 + 1)) + 50;
        }
        return val;
    };

    static modInverse(a, m) {
        // validate inputs
        [a, m] = [Number(a), Number(m)]
        console.log(a, m)
        if (Number.isNaN(a) || Number.isNaN(m)) {
            return NaN // invalid input
        }
        a = (a % m + m) % m
        if (!a || m < 2) {
            return NaN // invalid input
        }
        // find the gcd
        const s = []
        let b = m
        while (b) {
            [a, b] = [b, a % b]
            s.push({ a, b })
        }
        if (a !== 1) {
            return NaN // inverse does not exists
        }
        // find the inverse
        let x = 1
        let y = 0
        for (let i = s.length - 2; i >= 0; --i) {
            [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)]
        }
        return (y % m + m) % m
    }

    static generatePQ = function () {
        let p = this.generatePrime();
        let q = this.generatePrime();
        return [p, q];
    };

    static calculatePublicKey(p, q) {
        let phi = (p - 1) * (q - 1)
        let e = 2;
        while (e < phi) {
            if (this.gcd(e, phi) == 1) {
                return e
            } else {
                e++
            }
        }
    }

    static getPrivateKey(e, phi) {
        return this.modInverse(e, phi)
    }

    static encrypt(message, pk, n) {
        // return Math.pow(message, pk) % n
        return bigInt(message).modPow(pk, n);
    };

    static decrypt(ciphertext, sk, n) {
        return bigInt(ciphertext).modPow(sk, n)
    }
}


export default Rsa;