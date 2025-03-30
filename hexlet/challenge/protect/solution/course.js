/**
 * @typedef {Object} Course
 * @property {function} getName
 * */

export default class Course {
    constructor({ name, language, created }) {
        this.language = language;
        this._name = name;
        this._created = created;

        this.getName = this.getName.bind(this);
        this.setName = this.setName.bind(this);
    }

    get created() {
        return this._getCreated();
    }

    getName() {
        return `${this.language}: ${this._name}`;
    }

    _getCreated() {
        return this._created;
    }

    setName(name) {
        this._name = name;
    }
}
