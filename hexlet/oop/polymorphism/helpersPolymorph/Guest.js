// @ts-check

class Guest {
    constructor() {
        this.type = 'guest';
        this.name = 'Guest';
    }

    getName() {
        return this.name;
    }

    getTypeName() {
        return this.type;
    }
}

export default Guest;
