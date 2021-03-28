import { EventEmitter } from "events";

export namespace EventNS {
  export const enum EventType {
    Start = 'start'
  }
}

export class EventBus {
    private ee = new EventEmitter();

    Emit(event_type: EventNS.EventType, payload: any) {
        this.ee.emit(event_type, payload);
    }

    On(event_type: EventNS.EventType, callback: (...args) => void) {
        this.ee.on(event_type, callback);
    }
}