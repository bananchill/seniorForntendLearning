import LinkedList from './linkedList/LinkedList.js';

export default class Hash {
    constructor() {
        this.table = [];
        this.count = 0;
    }

    static hash(s) {
        const k = 65537;
        const m = 2 ** 20;

        let result = 0;
        let power = 1;
        for (let i = 0; i < s.length; i += 1) {
            result = (result + power * s.charCodeAt(i)) % m;
            power = (power * k) % m;
        }

        return result;
    }

    static calculateIndex(table, key) {
        return Hash.hash(String(key)) % table.length;
    }

    rebuildTableIfNeed() {
        if (this.table.length === 0) {
            this.table.length = 128;
        } else {
            const loadFactor = this.count / this.table.length;
            if (loadFactor >= 0.8) {
                const newTable = new Array(this.table.length * 2);
                for (const list of this.table) {
                    for (const pair of list) {
                        const newIndex = Hash.calculateIndex(newTable, pair.key);
                        if (typeof (newTable[newIndex]) === 'undefined') {
                            newTable[newIndex] = new LinkedList();
                        }

                        newTable[newIndex]?.append(pair);
                    }
                }

                this.table = newTable;
            }
        }
    }

    set(key, value) {
        this.rebuildTableIfNeed();

        const index = Hash.calculateIndex(this.table, key);
        if (typeof (this.table[index]) === 'undefined') {
            this.table[index] = new LinkedList();
        }

        this.table[index]?.append({key, value});
        this.count += 1;
    }

    get(key) {
        const index = Hash.calculateIndex(this.table, key);
        if (typeof (this.table[index]) === 'undefined') {
            return undefined;
        }

        const current = this.table?.[index].head;

        do {
            if (current.value.key === key) {
                return current.value;
            }
        } while (current.next);

        return undefined;
    }

    remove(key) {
        const index = Hash.calculateIndex(this.table, key);
        if (typeof (this.table[index]) === 'undefined') {
            return null;
        }

        const current = this.table[index].head.value;

        this.table[index]?.delete();
        return current;
    }
}
