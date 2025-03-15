const obj = {
    // Изначально свойство value = 10
    value: 10,
    get y() {
        // Геттер возвращает this.value
        return this.value;
    }
};

// Proxy, использующий Reflect.get — передаёт receiver (то есть сам прокси)

const proxyReflect = new Proxy(obj, {
    get(target, prop, receiver) {
        debugger
        return Reflect.get(target, prop, receiver);
    }
});

// Proxy, использующий прямой доступ к target[prop]
const proxyDirect = new Proxy(obj, {
    get(target, prop, receiver) {
        return target[prop];
    }
});

// «Переопределим» свойство value на уровне прокси:
// Заметим, что напрямую присвоив значение через proxyX.value = ..., без set-ловушки
// по умолчанию запись пойдёт в target. Чтобы смоделировать различие,
// воспользуемся Object.defineProperty и определим свойство на самом прокси.
// (Мы можем обойти это ограничение, поскольку Proxy — не самостоятельный объект, но
// для демонстрации воспользуемся следующим приемом.)
console.log("proxyReflect: ", proxyReflect)
Object.defineProperty(proxyReflect, 'value', {
    value: 100,
    writable: true,
    configurable: true,
    enumerable: true
});
console.log("proxyDirect: ", proxyDirect)
Object.defineProperty(proxyDirect, 'value', {
    value: 200,
    writable: true,
    configurable: true,
    enumerable: true
});

console.log(obj)
// Теперь смотрим на вычисляемое свойство y
console.log("Используя Reflect.get:");
console.log(proxyReflect.y);
// Геттер вызывается с receiver = proxyReflect, и внутри this.value берется значение, определенное на прокси, т.е. 100.


console.log(obj)
console.log("Используя прямой доступ к target:");
console.log(proxyDirect.y);
// Здесь get ловушка просто возвращает target.y. При этом геттер вызывается с контекстом target (obj),
// и this.value ссылается на obj.value, которое осталось равным 10.
