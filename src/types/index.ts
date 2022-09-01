
/**
 * @requestUrl url adress
 * @historyTracker history report
 * @hashTracker hash report
 * @domTracker dom event report
 * @sdkVersion sdk version
 * @extra other
 * @jsError error report
 */
export interface DefaultOptons {
    uuid: string | undefined,
    requestUrl: string | undefined,
    historyTracker: boolean,
    hashTracker: boolean,
    domTracker: boolean,
    sdkVersion: string | number,
    extra: Record<string, any> | undefined,
    jsError: boolean
}

// requestUrl
export interface Options extends Partial<DefaultOptons> {
    requestUrl: string,
}

//version
export enum TrackerConfig {
    version = '1.0.0'
}
//上报必传参数
export type reportTrackerData = {
    [key: string]: any,
    event: string,
    targetKey: string
}