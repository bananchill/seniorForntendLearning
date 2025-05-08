import Connected from "./states/Connected.js";
import Disconnected from "./states/Disconnected.js";

export default class TcpConnection {
    state;

    constructor() {
    }

    checkConnection() {
        if (!this.state.canWrite()) {
            throw new Error();
        }
    }

    write(mess) {
        this.checkConnection()
        console.log(mess);
    }

    getCurrentState() {
        return this.state.toString();
    }

    connect() {
        if (this.state) {
            throw new Error();
        }
        this.state = new Connected()
    }

    disconnect() {
        this.checkConnection()

        this.state = new Disconnected();
    }

}
