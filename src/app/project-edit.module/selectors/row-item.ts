import { Dictionary } from "@ngrx/entity";

export class RowItem {
  constructor(
    public key: string,
    public values: Dictionary<string>) {

  }
}
