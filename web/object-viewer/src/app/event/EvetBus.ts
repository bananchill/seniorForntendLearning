export class EventBus {
    private target = new EventTarget();

    on<E extends string>(event: E, cb: (detail: any) => void) {
        this.target.addEventListener(event, e => cb((e as CustomEvent).detail));
    }

    off<E extends string>(event: E, cb: (detail: any) => void) {
        this.target.removeEventListener(event, e => cb((e as CustomEvent).detail));
    }

    emit<E extends string, D = any>(event: E, data: D) {
        this.target.dispatchEvent(new CustomEvent(event, { detail: data }));
    }
}
