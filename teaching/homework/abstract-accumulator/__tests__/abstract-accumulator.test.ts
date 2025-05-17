import Accumulator from "../Accumulator";
import WrongAccumulator from "../WrongAccumulator";
import {AbstractAccumulator} from "../AbstractAccumulator";


describe('state', () => {
    it('#3 three classes: AbstractAccumulator, WrongAccumulator, Accumulator (with default value)', () => {
        const accumulator = new Accumulator();

        accumulator.read(12);

        expect(accumulator.value).toEqual(12);
        expect(() => new WrongAccumulator()).toThrow();
        // @ts-expect-error
        expect(() => new AbstractAccumulator()).toThrow();
    });

    it('#3 three classes: AbstractAccumulator, WrongAccumulator, Accumulator (with custom value)', () => {
        const accumulator = new Accumulator(5);

        accumulator.read(12);

        expect(accumulator.value).toEqual(17);
    });
})