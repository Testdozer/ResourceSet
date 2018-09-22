import { add } from "./serializable-actions.registration";

export function SerializableAction<T extends { new(...args: any[]): {} }>(): ClassDecorator {
  return (target): void => {
    add((target as any) as T, (target as any).type);
  };
}
