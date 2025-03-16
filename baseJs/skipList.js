class SkipListNode {
    constructor(value, level) {
        this.value = value;
        // Указатели на следующий элемент на каждом уровне
        this.forward = new Array(level + 1).fill(null);
    }
}

class SkipList {
    constructor(maxLevel = 16, probability = 0.5) {
        this.maxLevel = maxLevel;
        this.probability = probability;
        this.level = 0; // текущий максимальный уровень
        // Создаем head-узел со значением -Infinity
        this.head = new SkipListNode(-Infinity, maxLevel);
    }

    // Генерация случайного уровня для нового узла
    randomLevel() {
        let lvl = 0;
        while (Math.random() < this.probability && lvl < this.maxLevel) {
            lvl++;
        }
        return lvl;
    }

    // Поиск элемента в Skip List
    search(value) {
        let current = this.head;
        // Проходим по уровням сверху вниз
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] !== null && current.forward[i].value < value) {
                current = current.forward[i];
            }
        }
        current = current.forward[0];
        return current && current.value === value ? current : null;
    }

    // Вставка нового элемента
    insert(value) {
        const update = new Array(this.maxLevel + 1);
        let current = this.head;

        // Находим узлы, которые нужно обновить на каждом уровне
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] !== null && current.forward[i].value < value) {
                current = current.forward[i];
            }
            update[i] = current;
        }

        current = current.forward[0];

        // Если элемент не найден, вставляем новый узел
        if (current === null || current.value !== value) {
            let lvl = this.randomLevel();
            if (lvl > this.level) {
                for (let i = this.level + 1; i <= lvl; i++) {
                    update[i] = this.head;
                }
                this.level = lvl;
            }

            const newNode = new SkipListNode(value, lvl);
            for (let i = 0; i <= lvl; i++) {
                newNode.forward[i] = update[i].forward[i];
                update[i].forward[i] = newNode;
            }
        }
    }

    // Удаление элемента
    delete(value) {
        const update = new Array(this.maxLevel + 1);
        let current = this.head;

        // Находим узлы, которые нужно обновить
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] !== null && current.forward[i].value < value) {
                current = current.forward[i];
            }
            update[i] = current;
        }

        current = current.forward[0];

        // Если элемент найден, обновляем указатели
        if (current !== null && current.value === value) {
            for (let i = 0; i <= this.level; i++) {
                if (update[i].forward[i] !== current) break;
                update[i].forward[i] = current.forward[i];
            }
            // Уменьшаем уровень, если верхние уровни пусты
            while (this.level > 0 && this.head.forward[this.level] === null) {
                this.level--;
            }
        }
    }
}

// Пример использования:
const skipList = new SkipList();
debugger
skipList.insert(3);
skipList.insert(6);
skipList.insert(7);
skipList.insert(9);
skipList.insert(12);
skipList.insert(19);

console.log("Search for 7:", skipList.search(7)); // Выведет узел с value=7
skipList.delete(7);
console.log("Search for 7 after deletion:", skipList.search(7)); // Выведет null
