import { DescriptionFactory, REGISTERED_DESCRIPTIONS } from "./descriptions.registration";

export function AsDescriptable<T>(description: string | DescriptionFactory<T>): ClassDecorator {
  return (target): void => {
    const info = {object: target, description};
    REGISTERED_DESCRIPTIONS.push(info);
  };
}
