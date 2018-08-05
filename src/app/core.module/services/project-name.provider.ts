import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProjectNameProvider {

  public get(path: string): Observable<string> {
    return new Observable<string>(observer => {
      observer.next(path);
      observer.complete();
    });
  }
}
