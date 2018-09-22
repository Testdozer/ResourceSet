import { Injectable } from "@angular/core";
import uuidv4 from "uuid/v4";

@Injectable({
  providedIn: "root"
})
export class GuidProvider {
  public new(): string {
    return uuidv4();
  }
}
