// @ts-check

import _ from 'lodash';
import InMemoryKV from '../InMemoryKV.js';
import { describe, expect, it } from "@jest/globals";

describe('InMemoryKV', () => {
    const obj = { key: 10 };
    const cloneObj = _.cloneDeep(obj);

    it('get, set, unset, toObject', () => {
        const map = new InMemoryKV(obj);

        expect(map.get('key2')).toBeNull();
        expect(map.get('key2', 'default')).toBe('default');
        expect(map.get('key')).toBe(10);
        expect(map.get('key', 'default')).toBe(10);

        map.set('key2', 'value2');
        map.set('key', 'value');

        expect(map.get('key2', 'default')).toBe('value2');
        expect(map.get('key2')).toBe('value2');
        expect(map.get('key')).toBe('value');

        map.unset('key');

        expect(map.get('key')).toBeNull();
        expect(map.toObject()).toEqual({ key2: 'value2' });
    });

    it('get default value', () => {
        const map = new InMemoryKV(obj);
        debugger

        expect(map.get('key2', 'default')).toBe('default');

        map.set('key2', false);

        expect(map.get('key2', 'default')).toBeFalsy();
    });

    it('must be immutable', () => {
        const map = new InMemoryKV(obj);
        obj.key2 = 'value2';

        expect(map.toObject()).toEqual(cloneObj);

        const map2 = map.toObject();
        map2.key2 = 'value2';
        console.log()
        expect(map.toObject()).toEqual(cloneObj);
    });

    it('must be immutable with deep object', () => {
        const deepObj = { key1: 'value1', key2: { key3: 'value2' } };
        const cloneDeepObj = _.cloneDeep(deepObj);
        const map = new InMemoryKV(deepObj);

        const map2 = map.toObject();
        map2.key2.key3 = 'another_value';
        expect(map.toObject()).not.toBe(cloneDeepObj);
        expect(map.toObject()).toEqual(cloneDeepObj);
    });
});
