const romanMap = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
};

const createRomanProxy = () => {
    const userRomanMap = {string: "", result: 0};

    const calculateAndSetRoman = (target, receiver) => {
        const letters = target.string.split("");
        debugger
        let result = 0
        for (let i = 0; i < letters.length; i++) {
            if (letters[i + 1] && romanMap[letters[i] + letters[i + 1]]) {
                result += romanMap[letters[i] + letters[i + 1]];
                i++
            }else {
                result += romanMap[letters[i]];
            }
        }

        target.result = result
        return receiver;
    };

    const handler = {
        get(target, key, receiver) {
            console.log("get called: ", key)

            if (typeof target[key] === "function" || key === "result" || key === "string") {
                return Reflect.get(target, key, receiver);
            }

            target.string += key;

            return calculateAndSetRoman(target, receiver);
        },
        set(target, key, value) {
          return Reflect.set(target, key, value);
        },
        defineProperty(target, key, value) {
            return Reflect.defineProperty(target, key, value);
        },
    };

    const proxy = new Proxy(userRomanMap, handler);

    Object.defineProperty(proxy, "toString", {
        value: function () {
            return this.result;
        },
        enumerable: false,
        configurable: true,
        writable: true,
    });

    return proxy;
};

export { createRomanProxy };
