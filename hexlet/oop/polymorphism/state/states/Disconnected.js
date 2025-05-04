export default class Disconnected {
    canWrite() {
        return false;
    }
    toString() {
        return 'disconnected'
    }
}