import Driving from "./Driving.js";
import Walking from "./Walking.js";

export default class Navigator {
    constructor(way, typeWay) {
        if (typeWay == 'driving') {
            this.classWay = new Driving(way)
        } else {
            this.classWay = new Walking(way)
        }
    }

    goToNextTurn() {
        return this.classWay.next()
    }
}