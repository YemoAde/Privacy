export const isPrime = (num) => {
    let nums = [2, 3, 4, 5, 7];
    for (let i = 0; i < nums.length; i++) {
        if (num % nums[i] == 0 && num != nums[i]) {
            return false
        }
    }
    return true;
}

export const gcd = (x, y) => {
    if (y == 0) return x;
    return this.gcd(y, x % y)
}

export const generatePrime = () => {
    let val = 0;
    while (!this.isPrime(val)) {
        val = ~~(Math.random() * (100 - 50 + 1)) + 50;
    }
    return val;
};