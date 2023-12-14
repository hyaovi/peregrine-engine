import { Engine } from './Engine';
import { BaseEntity } from './entities/BaseEntity';

export const DOM_EVENT_NAMES = ['resize', 'click', 'pointerdown', 'mousemove'];

export class Signals extends BaseEntity implements IBaseEntityClass {
  private engine: Engine;
  private listeners: { [key: string]: Function[] } = {};
  static DOM_EVENT_NAMES: string[] = DOM_EVENT_NAMES;
  constructor(engine: Engine) {
    super();
    this.engine = engine;
  }
  public init() {
    this.initDOMEvents();
  }
  public on(eventName: string, listener: Function) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
    return () => this.off(eventName, listener);
  }
  public off(eventName: string, listener: Function) {
    if (!this.listeners[eventName]) {
      console.log('none to remove', eventName, listener);
      return;
    }
    const index = this.listeners[eventName].indexOf(listener);
    if (index === -1) {
      return;
    }
    console.log('removing listener', eventName, listener);
    this.listeners[eventName].splice(index, 1);
  }
  public emit(eventName: string, ...args: any[]) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => {
        listener(...args);
      });
    }
  }

  private initDOMEvents() {
    DOM_EVENT_NAMES.forEach((eventName: string) => {
      document.addEventListener(eventName, (event: Event) => {
        this.emit(eventName, event);
      });
    });
  }
}
