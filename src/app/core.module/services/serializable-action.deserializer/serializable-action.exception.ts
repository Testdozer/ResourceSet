export class DeserializeActionException extends Error {
  constructor(action: any) {
    super(`Cannot deserialize action: ${action ? action.type : "undefined"}`);
  }
}
