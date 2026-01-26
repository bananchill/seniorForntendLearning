const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

const flockA = 4;
const flockB = 2;
const flockC = 0;

const result =
    add(multiply(flockB, add(flockA, flockC)), multiply(flockA, flockB)); // multiply(flockB, add(flockA, flockA));


// associative
// add(add(x, y), z) === add(x, add(y, z));

// commutative
// add(x, y) === add(y, x);

// identity
// add(x, 0) === x;

// distributive
// multiply(x, add(y,z)) === add(multiply(x, y), multiply(x, z));


// Original line
// add(multiply(flockB, add(flockA, flockC)), multiply(flockA, flockB));

// Apply the identity property to remove the extra add
// (add(flockA, flockC) == flockA)
// add(multiply(flockB, flockA), multiply(flockA, flockB));

// Apply distributive property to achieve our result
// multiply(flockB, add(flockA, flockA));