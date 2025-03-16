//     Описание задачи:
// Напиши функцию createLoggingProxy(obj),
//  которая принимает объект obj и возвращает его обёртку — Proxy, которая перехватывает доступ
//   к любому свойству. При каждом обращении к свойству прокси должна:
//
// Логировать имя свойства и возвращаемое значение.
// Если запрашиваемое свойство является функцией или геттером (то есть, имеет важное значение контекста при вызове),
// оно должно вызываться с корректным контекстом (receiver). Для этого обязательно использовать Reflect.get
// (без него правильная работа с геттерами и методами не гарантируется).
// Требования:
//
// При перехвате операции чтения в ловушке get использовать Reflect.get(target, prop, receiver).
// Логировать (например, через console.log) имя свойства и результат его получения.
// Вернуть значение свойства так, чтобы вызов геттеров и методов выполнялся с правильным контекстом.

const person = {
    firstName: "Alice",
    lastName: "Smith",
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    greet() {
        return `Hello, I'm ${this.fullName}`;
    }
};

const createLoggingProxy = (obj) => {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            console.log(`Чтение свойства "${ prop }"`);
            return Reflect.get(target, prop, receiver);
        },
        // Ловушка для записи в свойство
        set(target, prop, value, receiver) {
            console.log(`Запись свойства "${ prop }" со значением "${ value }"`);
            return Reflect.set(target, prop, value, receiver);
        }
    })
}
const proxyPerson =  createLoggingProxy(person)


console.log(proxyPerson.firstName);   // Лог: Чтение свойства "firstName" -> "Alice"
console.log(proxyPerson.fullName);    // Лог: Чтение свойства "fullName" -> "Alice Smith"
console.log(proxyPerson.greet());     // Лог: Чтение свойства "greet" (вызов метода)
proxyPerson.lastName = "Johnson";       // Лог: Запись свойства "lastName" со значением "Johnson"
console.log(proxyPerson.fullName);    // "Alice Johnson"


// ???????????????????????????????

// const obj = {
//     name: "Maksim",
//     setName(newVal) {
//         this.name = newVal
//     },
//     getName() {
//         return this.name
//     },
// }
// const createLoggingProxy = (obj) => {
//     return new Proxy(obj, {
//         get(target, prop, receiver) {
//             console.log(`Чтение свойства "${ prop }"`);
//             return target[prop];
//         },
//         // Ловушка для записи в свойство
//         set(target, prop, value, receiver) {
//             console.log(`Запись свойства "${ prop }" со значением "${ value }"`);
//             target[prop] = value;
//             return target[prop];
//         }
//     })
// }
// const proxyObj =  createLoggingProxy(obj)
