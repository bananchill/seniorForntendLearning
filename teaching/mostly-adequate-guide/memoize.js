const memoize = (f) => {
  const cache = {};

  return (...args) => {
    const argStr = JSON.stringify(args);
    cache[argStr] = cache[argStr] || f(...args);
    return cache[argStr];
  };
};

const squareNumber = memoize((x) => x * x);

console.log(squareNumber(4));
console.log(squareNumber(4));
console.log(squareNumber(5));
console.log(squareNumber(5));
console.log(squareNumber(4));
console.log(squareNumber(3));

