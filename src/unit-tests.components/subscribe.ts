import { Observable, Subscription } from "rxjs";

export function subscribe<T>(observable: Observable<T>):
  { subscription: Subscription, success: jasmine.Spy, error: jasmine.Spy, completed: jasmine.Spy } {
  const success = jasmine.createSpy("success");
  const error = jasmine.createSpy("error");
  const completed = jasmine.createSpy("completed");
  const subscription = observable.subscribe(success, error, completed);
  return {subscription, success, error, completed};
}
