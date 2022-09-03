import { DefaultOptons, Options, TrackerConfig } from '../types/index';
import { createHistoryEvent } from '../utils/pv';

const MouseEventList: string[] = ['click', 'dblclick', 'contextmenu', 'mousedown', 'mouseup', 'mouseenter', 'mouseout', 'mouseover'];

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
    public sendTracker<T>(data: T) {
        this.reportTracker(data);
    }
    private targetKeyReport() {
        MouseEventList.forEach(event => {
            window.addEventListener(event, (e) => {
                const target = e.target as HTMLElement;
                const targetKey = target.getAttribute('target-key');
                if (targetKey) {
                    console.log(targetKey);
                    this.reportTracker({
                        event,
                        targetKey
                    })
                }

            })
        })
    }

    private errorHandle() {
        document.addEventListener('error', (event) => {
            this.reportTracker({
                event: 'jsError',
                targetKey: 'message',
                message: event.message
            })
        }, true)
    }

    private promiseRejectedHandle() {
        window.addEventListener('unhandledrejection', (event) => {
            event.promise.catch(error => {
                this.reportTracker({
                    event: 'promiseRejected',
                    targetKey: 'message',
                    message: error
                })
            })

        }, true)
    }
    private captureEvent<T>(event: string[], targetKey: string, data?: T) {
        event.forEach(ev => {
            window.addEventListener(ev, () => {
                this.reportTracker({
                    ev,
                    targetKey,
                    data
                })
            })
        })
    }
    private installTracker() {
        if (this.data.historyTracker) {
            this.captureEvent(['pushState', 'replaceState', 'popstate'], 'history-pv');
        }
        if (this.data.hashTracker) {
            this.captureEvent(['hashchange'], 'hash-pv');
        }
        if (this.data.domTracker) {
            this.targetKeyReport();
        }
        if (this.data.jsError) {
            this.errorHandle();
            this.promiseRejectedHandle();
        }
    }
    private reportTracker<T>(data: T) {
        const params = Object.assign(this.data, data, { time: new Date().getTime() });
        let headers = {
            type: 'application/x-www-form-urlencoded'
        };
        let blob = new Blob([JSON.stringify(params)], headers);
        navigator.sendBeacon(this.data.requestUrl, blob);
    }
}