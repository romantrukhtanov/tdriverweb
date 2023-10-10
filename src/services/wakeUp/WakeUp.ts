type HandlerWakeUp = () => void;

/**
 * Can be used to fix problems after wake up (e.g. incorrect socket reconnection problem).
 */
export class WakeUp {
  constructor() {
    this.start();
  }

  private handlers = new Set<HandlerWakeUp>();

  public onWakeUp = (handler: HandlerWakeUp): (() => void) => {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  };

  public start() {
    /* 1. We use worker to prevent false wake up fires,
    because they may be delayed if the main thread is blocked.
    2. Worker is initiated with timeout because it's not a priority at the start,
    and we don't want to block more important requests. */
    window.setTimeout(() => {
      try {
        const worker = new Worker('/assets/detectWakeupWorker.js');

        worker.onmessage = e => {
          if (e.data === 'WAKEUP') {
            this.handlers.forEach(handler => handler());
          }
        };
      } catch {
        // workaround; allow not shutdown services after being used in tests
      }
    }, 3000);
  }
}
