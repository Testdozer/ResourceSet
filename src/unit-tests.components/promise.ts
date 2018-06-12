 export function then<T>(promise: Promise<T>): { success: jasmine.Spy, error: jasmine.Spy } {
    const success = jasmine.createSpy("success");
    const error = jasmine.createSpy("error");
    promise.then(success, error);
    return {success, error};
}
