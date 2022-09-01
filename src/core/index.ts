import { DefaultOptons, Options, TrackerConfig } from '../types/index';
import { createHistoryEvent } from '../utils/pv';

export default class tracker {
    public data: Options;
    constructor(options: Options) {
        this.data = Object.assign(this.initDef(), options);
        this.installTracker();
    }
    private initDef(): DefaultOptons {
        window.history['pushState'] = createHistoryEvent('pushState');
        window.history['replaceState'] = createHistoryEvent('replaceState');
        return <DefaultOptons>{
            sdkVersion: TrackerConfig.version,
            historyTracker: false,
            hashTracker: false,
            domTracker: false,
            jsError: false
        }
    }
    public setUserId<T extends DefaultOptons['uuid']>(uuid: T) {
        this.data.uuid = uuid;
    }
    public setExtra<T extends DefaultOptons['extra']>(extra: T) {
        this.data.extra = extra;
    }
    private captureEvent<T>(event: string[], targetKey: string, data?: T) {
        event.forEach(ev => {
            window.addEventListener(ev, () => {
                console.log('ok');
            })
        })
    }
    private installTracker() {
        if (this.data.historyTracker) {
            this.captureEvent(['pushState', 'replaceState', 'popState'], 'history-pv');
        }
        if (this.data.hashTracker) {
            this.captureEvent(['hashchange'], 'hash-pv');
        }
    }
}