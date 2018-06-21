import { Injectable } from "@angular/core";
import { REGISTERED_DESCRIPTIONS } from "../../../shared/descriptable/descriptions.registration";
import { ITranslatable } from "../../../shared/translate/translatable";

@Injectable({
  providedIn: "root"
})
export class DescriptionProvider {

  public get(object: any): ITranslatable | any {
    for (const info of REGISTERED_DESCRIPTIONS) {
      if (info.object === object || object instanceof info.object) {
        if (typeof info.description === "string") {
          return {key: info.description, params: object};
        }

        return info.description(object);
      }
    }

    return undefined;
  }
}
