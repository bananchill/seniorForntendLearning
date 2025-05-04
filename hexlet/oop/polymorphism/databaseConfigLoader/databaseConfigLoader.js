import fs from 'fs';
import path from 'path';


export default class DatabaseConfigLoader {
    constructor(path) {
        this._path = path
    }

    readFileAsync(env) {
        const filePath = path.join(this._path, `database.${ env }.json`);
        return fs.readFileSync(filePath).toString();
    }

    load(env) {
        let configLoad = env
        let config = {}
        do {
            const file = this.readFileAsync(configLoad)
            const newConfig = JSON.parse(file);
            config = Object.assign({}, newConfig, config);
            configLoad = newConfig?.extend ?? null
        } while (configLoad);

        delete config.extend

        return config
    }
}

const pathToConfigs = path.join(__dirname, '__fixtures__');
const loader = new DatabaseConfigLoader(pathToConfigs);
const config = loader.load('production');

console.log(config);