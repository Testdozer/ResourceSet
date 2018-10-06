import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/index";
import { tap } from "rxjs/internal/operators";
import { OpenProjectAction } from "../../actions/open-project.action";
import { Navigation } from "../../services/navigation.service";

@Injectable()
export class OpenProjectEffect {
  constructor(
    private action$: Actions,
    private navigation: Navigation) {
  }

  @Effect({dispatch: false})
  public onOpenProject$(): Observable<Action> {
    return this.action$.pipe(
      ofType<OpenProjectAction>(OpenProjectAction.type),
      tap(() => this.navigation.toProject())
    );
  }
}
