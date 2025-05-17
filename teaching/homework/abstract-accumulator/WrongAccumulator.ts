import {AbstractAccumulator} from "./AbstractAccumulator";

export default class WrongAccumulator extends AbstractAccumulator {
    constructor(value = 0) {
        super(value);
    }
}