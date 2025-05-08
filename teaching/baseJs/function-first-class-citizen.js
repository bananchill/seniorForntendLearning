const createCounter = () => {
    let count = 0
    return {
        increment: () => count++,
        getValue: () => count,

    }
}

const counter = createCounter()


function workingWithCounter(incFunc, getValue) {
    incFunc();
    console.log(getValue())
}


workingWithCounter(counter.increment, counter.getValue);