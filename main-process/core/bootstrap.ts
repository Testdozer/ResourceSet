import { Injectable } from "injection-js";
import { Initializable } from "./core";

@Injectable()
export class Bootstrap {
  constructor(private services: Initializable[]) {

  }

  public run(): void {
    for (const service of this.services) {
      service.onInit();
    }
  }
}
