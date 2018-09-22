const REGISTERED_ACTION_SERIALIZERS: { action: { new(...args: any[]): {} }, type: string }[] = [];

export function clear(): void {
  REGISTERED_ACTION_SERIALIZERS.splice(0, REGISTERED_ACTION_SERIALIZERS.length);
}

export function add(action: { new(...args: any[]): {} }, type: string): void {
  REGISTERED_ACTION_SERIALIZERS.push({action, type});
}

export function get(): { action: { new(...args: any[]): {} }, type: string }[] {
  return [...REGISTERED_ACTION_SERIALIZERS];
}
