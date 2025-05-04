import generatePassword from "generate-password"

export default class PasswordGeneratorAdapter {
    constructor() {
    }


    generatePassword(length, options) {
        const passwordOpt = {
            length, ...Object.assign({}, {
                uppercase: false,
            }, options.reduce((acc, el) => {
                acc[el] = true
                return acc
            }, {}))
        };

        return generatePassword.generate(passwordOpt);
    }
}