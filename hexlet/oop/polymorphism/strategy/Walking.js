export default class Walking {
    currentWayStep = 0;

    constructor(way) {
        this.way = way;
    }

    next() {
        this.currentWayStep += 1;
        const currentWay = this.way[this.currentWayStep]
        return currentWay ?? null
    }
}