import InMemoryKV from '../InMemoryKv.js';
import swapKeyValue from '../key-value-functions.js';
import { describe, expect, it } from "@jest/globals";

describe("keyValueFunction", () => {
    it('swapKeyValue', () => {
        const map = new InMemoryKV({ key: 10 });
        map.set('key2', 'value2');
        swapKeyValue(map);

        expect(map.get('key')).toBeNull();
        expect(map.get(10)).toBe('key');
        expect(map.get('value2')).toBe('key2');
    });

    it('swapKeyValue2', () => {
        const map = new InMemoryKV({ foo: 'bar', bar: 'zoo' });
        debugger
        swapKeyValue(map);

        expect(map.toObject()).toEqual({ bar: 'foo', zoo: 'bar' });
    });

})