import LinkedListNode from './LinkedListNode.js';

export default class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend(value) {
        // Делаем новый узел головой
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        // Если нет хвоста, этот узел будет и хвостом
        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    append(value) {
        const newNode = new LinkedListNode(value);

        // Если нет головы, этот узел будет головой
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        // Присоеденяем новый узел к концу, делаем его хвостом
        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    delete(value) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        // Проверяем с головы какие ноды надо удалить
        while (this.head && this.head.value === value) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        // Если у головы не нашли, проверяем остальные значения в списке
        if (currentNode !== null) {
            while (currentNode.next) {
                if (currentNode.next.value === value) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // Проверяе хвост
        if (this.tail.value === value) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    find(value) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        // Перебираем список с головы, первое найденное значение возвращаем
        while (currentNode) {
            if (value !== undefined && currentNode.value === value) {
                return currentNode;
            }

            // Делаем текущей следующий элемент списка
            currentNode = currentNode.next;
        }

        return null;
    }

    isEmpty() {
        return this.head === undefined && this.tail === undefined;
    }

    toArray() {
        const result = [];

        if (!this.head) {
            return result;
        }

        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.value !== undefined) {
                result.push(currentNode.value);
            }

            currentNode = currentNode.next;
        }

        return result;
    }
}
