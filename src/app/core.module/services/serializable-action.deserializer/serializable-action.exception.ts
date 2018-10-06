export class SerializableActionException extends Error {
  constructor() {
    super("Cannot deserialize action");
  }
}
