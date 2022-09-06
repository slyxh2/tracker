# pak-tracker

This is a SDK to monitor the pageview, unique vistor, DOM event and JavaScript Error.

The usage is as follows


```js
import Tracker from 'pak-tracker'

const tr = new Tracker({
    requestUrl:"xxxxxx"
})

```

## Options introduction
```ts

/**
 * @requestUrl report Url
 * @historyTracker history report
 * @hashTracker hash report
 * @domTracker dom event report with target-key
 * @historyTracker sdkVersion 
 * @historyTracker extra 
 * @jsError js error and promise rejected report
 */
export interface DefaultOptons {
    uuid: string | undefined,
    requestUrl: string | undefined,
    historyTracker: boolean,
    hashTracker: boolean,
    domTracker: boolean,
    sdkVersion: string | number,
    extra: Record<string, any> | undefined,
    jsError:boolean
}
```

### DOM event report

When you enable the domTrakcer, this tracker will report if the event on the element with target-key is triggered. The events listened by the tracker are shown below. 
```ts
const MouseEventList: string[] = ['click', 'dblclick', 'contextmenu', 'mousedown', 'mouseup', 'mouseenter', 'mouseout', 'mouseover'];
```

You should add the **target-key** like this, the tracker also send the key to backend.
```html
<button target-key="patrick">click me!!!!!</button>
```

### public methods

``` setUserId
