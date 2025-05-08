// class Person {
//     #name = '';
//     #age = 0
//     constructor(name, age) {
//         this.#name = name;
//         this.#age = age;
//
//
//     }
//
//     sayHello() {
//         console.log(this.#name, "- hello")
//     }
// }
//
// const person = new Person("maks", 20);
// const delayedGreeting = () => setTimeout(() => person.sayHello.call(person), 2000);
// delayedGreeting();


class Person {
    #name = '';
    #age = 0

    constructor(name, age) {
        this.#name = name;
        this.#age = age;

        this.sayHello = this.sayHello.bind(this);
    }

    sayHello() {
        console.log(this.#name, "- hello")
    }
}

const person = new Person("maks", 20);
const delayedGreeting = () => setTimeout(() => person.sayHello.call(person), 2000);
delayedGreeting()