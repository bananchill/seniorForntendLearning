// @ts-check

import Navigator from '../Navigator.js';
import {describe, expect, it} from "@jest/globals";

const streets = ['street1', 'street2', 'street3', 'street4', 'street5'];

describe('Navigator', () => {
    it('test pedestrian navigator 1', () => {
        const navigator = new Navigator(streets);
        const result1 = navigator.goToNextTurn();
        expect(result1).toBe('street2');
        const result2 = navigator.goToNextTurn();
        expect(result2).toBe('street3');
        navigator.goToNextTurn();
        const result3 = navigator.goToNextTurn();
        expect(result3).toBe('street5');
        const result4 = navigator.goToNextTurn();
        expect(result4).toBeNull();
    });

    it('test driver navigator 2', () => {
        const navigator = new Navigator(streets, 'driving');
        const result1 = navigator.goToNextTurn();
        expect(result1).toBe('street3');
        const result2 = navigator.goToNextTurn();
        expect(result2).toBe('street5');
        const result3 = navigator.goToNextTurn();
        expect(result3).toBeNull();
    });
});
