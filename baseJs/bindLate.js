const bindLate = (context, method) => {
    return function () {
        context[method].apply(context, arguments);
    }
}
class UserComponent {
    #name = "Maks"

    constructor() {
    }

    handleAction() {
        console.log(this.#name, "handleAction")
    }
}


const user = new UserComponent()
const handle = bindLate(user,"handleAction")
setTimeout(handle)

console.log(this === global)