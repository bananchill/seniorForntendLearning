const buffer = new SharedArrayBuffer(16)
let int = new Int32Array(buffer);

int[0] = 5;

console.log(int[0])

// const worker = new Worker('worker.js');
//
// worker.postMessage(buffer)

// Atomics.store(int, 0, 43)
Atomics.store(int, 0, Atomics.load(int, 0) + 1)

console.log(int)