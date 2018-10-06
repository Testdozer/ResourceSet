const REGISTERED_IPC_MAIN_DISPATCHABLE_ACTIONS: string[] = [];

export function clear(): void {
  REGISTERED_IPC_MAIN_DISPATCHABLE_ACTIONS.splice(0, REGISTERED_IPC_MAIN_DISPATCHABLE_ACTIONS.length);
}

export function add(type: string): void {
  REGISTERED_IPC_MAIN_DISPATCHABLE_ACTIONS.push(type);
}

export function get(): string[] {
  return [...REGISTERED_IPC_MAIN_DISPATCHABLE_ACTIONS];
}
