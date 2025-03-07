function bigintSqrt(value) {
    if (value < 0n) return 0;
    if (value < 2n) return value;

    let x0 = value / 2n;
    let x1 = (x0 + value / x0) / 2n;
    while (x1 < x0) {
        x0 = x1;
        x1 = (x0 + value / x0) / 2n;
    }
    return x0;
}
function isPrime(n) {
    if (n < 2n) return false;
    if (n === 2n) return true;
    if (n % 2n === 0n) return false;

    const sqrtN = bigintSqrt(n);

    for (let i = 3n; i <= sqrtN; i += 2n) {
        if (n % i === 0n) {
            return false;
        }
    }

    return true;
}

console.log(isPrime(2147483648n))
console.log(isPrime(87178291199n)) // true