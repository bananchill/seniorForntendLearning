export default class Driving {
    currentWayStep = 0;

    constructor(way) {
        this.way = way;
    }

    next() {
        this.currentWayStep += 2;
        const currentWay = this.way[this.currentWayStep]
        return currentWay ?? null
    }
}