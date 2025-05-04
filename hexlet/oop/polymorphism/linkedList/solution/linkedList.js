import Node from './Node.js'

/**
 * @param {Node} numbers
 * */

export default function reverse(numbers) {
    let current = numbers;
    let value = new Node(current.getValue());
    current = current.next;
    while (current) {
        value = new Node(current.getValue(), value);
        current = current.next;

    }
    return value
}

const numbers = new Node(1, new Node(2, new Node(3))); // (1, 2, 3)
const reversedNumbers = reverse(numbers); // (3, 2, 1)

console.log(reversedNumbers)