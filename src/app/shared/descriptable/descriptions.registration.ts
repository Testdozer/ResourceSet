import { ITranslatable } from "../translate/translatable";

export type DescriptionFactory<T> = (instance: T) => ITranslatable;

export const REGISTERED_DESCRIPTIONS: { object: any, description: string | DescriptionFactory<any> }[] = [];
