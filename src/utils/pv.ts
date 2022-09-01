export const createHistoryEvent = <T extends keyof History>(type: T): () => any => {
    const origin = history[type]; // function in History class
    return function (this: any) {
        const res = origin.apply(this, arguments);
        const ev = new Event(type);
        window.dispatchEvent(ev);
        return res;
    }
}
