import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/index";
import { tap } from "rxjs/internal/operators";
import { AppActionTypes } from "../../actions/actions";
import { Start } from "../../actions/start.action";
import { Navigation } from "../../services/navigation.service";

@Injectable()
export class StartUpEffect {
  constructor(
    private action$: Actions,
    private navigation: Navigation) {
  }

  @Effect({dispatch: false})
  public onStartUp$(): Observable<Action> {
    return this.action$.pipe(
      ofType<Start>(AppActionTypes.Start),
      tap(() => this.navigation.toProjectSelector())
    );
  }
}
