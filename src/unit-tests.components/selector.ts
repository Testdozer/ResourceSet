export type INameSelector<T> = (instance: T) => any;

export function getName<T>(selector: INameSelector<T>): string {
  let selectedName: string;

  const options = {
    get(target, name) {
      selectedName = name;
      return undefined;
    }
  };

  const proxy = (new Proxy({}, options) as any) as T;
  selector(proxy);
  return selectedName;
}
