class TreapNode {
    constructor(key, priority = Math.random()) {
        this.key = key;
        this.priority = priority;
        this.left = null;
        this.right = null;
    }
}

class Treap {
    constructor() {
        this.root = null;
    }

    // Правая ротация вокруг узла y
    rotateRight(y) {
        const x = y.left;
        y.left = x.right;
        x.right = y;
        return x;
    }

    // Левая ротация вокруг узла x
    rotateLeft(x) {
        const y = x.right;
        x.right = y.left;
        y.left = x;
        return y;
    }

    // Рекурсивная вставка нового узла с key в поддерево node
    _insert(node, key, priority = Math.random()) {
        if (node === null) {
            return new TreapNode(key, priority);
        }
        if (key < node.key) {
            node.left = this._insert(node.left, key, priority);
            // Если нарушается свойство кучи (приоритет родителя больше, чем у левого ребенка), выполняем правую ротацию
            if (node.left.priority < node.priority) {
                node = this.rotateRight(node);
            }
        } else {
            node.right = this._insert(node.right, key, priority);
            // Если нарушается свойство кучи (приоритет родителя больше, чем у правого ребенка), выполняем левую ротацию
            if (node.right.priority < node.priority) {
                node = this.rotateLeft(node);
            }
        }
        return node;
    }

    // Вставка ключа в Treap
    insert(key, priority) {
        this.root = this._insert(this.root, key, priority);
    }

    // Рекурсивный поиск ключа в поддереве node
    _search(node, key) {
        if (node === null) return null;
        if (key === node.key) return node;
        return key < node.key
            ? this._search(node.left, key)
            : this._search(node.right, key);
    }

    // Поиск ключа в дереве
    search(key) {
        return this._search(this.root, key);
    }

    // Рекурсивный обход дерева (in-order traversal)
    inOrder(node = this.root, result = []) {
        if (node !== null) {
            this.inOrder(node.left, result);
            result.push({ key: node.key, priority: node.priority });
            this.inOrder(node.right, result);
        }
        return result;
    }
}

// Пример использования Treap (Cartesian Tree):
const treap = new Treap();

debugger
// Вставка нескольких ключей. Приоритеты генерируются случайно (чем меньше число, тем выше приоритет).
treap.insert(50);
treap.insert(30);
treap.insert(70);
treap.insert(20);
treap.insert(40);
treap.insert(60);
treap.insert(80);

console.log("In-order обход:");
console.log(treap.inOrder());

// Поиск узла с ключом 40
const node40 = treap.search(40);
console.log("Найденный узел с key=40:", node40);
