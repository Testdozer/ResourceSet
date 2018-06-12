import * as equal from "fast-deep-equal";
import { It } from "moq.ts";

export class Is<T> extends It<T> {
  public static Eq<T>(expected: T): T {
    const predicate = actual => equal(expected, actual);
    return new It<T>(predicate) as any;
  }
}
