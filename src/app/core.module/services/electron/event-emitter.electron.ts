import EventEmitter = Electron.EventEmitter;

export abstract class EventEmitterElectron<T extends EventEmitter> implements EventEmitter {

  protected constructor(private factory: () => T) {
  }

  protected get instance(): T {
    return this.factory();
  }

  /* tslint:disable:ban-types */
  public addListener(event: string, listener: Function): this {
    this.instance.addListener(event, listener);
    return this;
  }

  public emit(event: string, ...args: any[]): boolean {
    return this.instance.emit(event, args);
  }

  public eventNames(): string[] {
    return this.instance.eventNames();
  }

  public getMaxListeners(): number {
    return this.instance.getMaxListeners();
  }

  public listenerCount(type: string): number {
    return this.instance.listenerCount(type);
  }

  public listeners(event: string): Function[] {
    return this.instance.listeners(event);
  }

  public on(event: string, listener: Function): this {
    this.instance.on(event, listener);
    return this;
  }

  public once(event: string, listener: Function): this {
    this.instance.once(event, listener);
    return this;
  }

  public prependListener(event: string, listener: Function): this {
    this.instance.prependListener(event, listener);
    return this;
  }

  public prependOnceListener(event: string, listener: Function): this {
    this.instance.prependOnceListener(event, listener);
    return this;
  }

  public removeAllListeners(event?: string): this {
    this.instance.removeAllListeners(event);
    return this;
  }

  public removeListener(event: string, listener: Function): this {
    this.instance.removeListener(event, listener);
    return this;
  }

  public setMaxListeners(n: number): this {
    this.instance.setMaxListeners(n);
    return this;
  }

  /* tslint:enable:ban-types */
}
