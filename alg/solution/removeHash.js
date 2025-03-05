import Hash from '../hash.js';

const remove = (hash, key) => {
    const el = hash.get(key);
    if (!el) {
        return null
    }

    hash.remove(key);
    return el.value;
}

// export default (map, key) => {
//
//     const hash = new Hash();
//
//     for (const [key, value] of Object.entries(map)) {
//         hash.set(key, value);
//     }
//
//     return remove(hash, key);
// }


const table = new Hash();
table.set("key", "value");
table.set("key1", "value1");

const removed = remove(table, "key");
console.log(removed); // => value

// В хеше ключа больше нет
table.get("key"); // undefined