import { createRomanProxy } from "./rim.js";
import { describe, expect, test } from "@jest/globals";

const getRomanValue = (roman, numeralChain) => {
    if (!numeralChain.includes(".")) {
        return roman[numeralChain];
    }
    return numeralChain.split(".").reduce((acc, part) => acc[part], roman);
};

describe("Roman numeral conversion", () => {
    const testCases = [
        { numeral: "I.I.I", expected: 3 },
        { numeral: "III", expected: 3 },
        { numeral: "I.V", expected: 4 },
        { numeral: "IV", expected: 4 },
        { numeral: "LXXX", expected: 80 },
        { numeral: "LX.XX", expected: 80 },
        { numeral: "L.XXX", expected: 80 },
        { numeral: "L.X.X.X", expected: 80 },
    ];

    testCases.forEach(({ numeral, expected }) => {
        test(`"${numeral}" should equal ${expected}`, () => {
            const roman = createRomanProxy();
            const value = getRomanValue(roman, numeral);

            expect(value.toString()).toBe(expected);
        });
    });
});
