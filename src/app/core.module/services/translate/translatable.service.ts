import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { merge, Observable } from "rxjs";
import { ITranslatable } from "../../../shared/translate/translatable";

@Injectable({
  providedIn: "root"
})
export class TranslatableService {

  private static asTranslatable(translatable: ITranslatable | string): ITranslatable {
    if (typeof translatable === "string") {
      return {key: translatable};
    }
    return translatable as ITranslatable;
  }

  constructor(private translateService: TranslateService) {

  }

  public get(...translatables: (string | ITranslatable)[]): Observable<string> {
    const streams: Observable<string>[] = [];
    for (const item of translatables) {
      const translatable = TranslatableService.asTranslatable(item);
      const stream = this.translateService.get(translatable.key, translatable.params);
      streams.push(stream);
    }
    return merge.apply(null, streams);
  }
}
