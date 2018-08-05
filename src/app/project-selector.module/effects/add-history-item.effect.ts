import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/index";
import { map, switchMap } from "rxjs/internal/operators";
import { ProjectNameProvider } from "../../core.module/services/project-name.provider";
import { AddHistoryItemAction } from "../actions/add-history-item.action";
import { OpenProjectAction } from "./../../core.module/actions/open-project.action";

@Injectable()
export class AddHistoryItemEffect {
  constructor(
    private action$: Actions,
    private projectNameProvider: ProjectNameProvider) {
  }

  @Effect()
  public onOpenProject$(): Observable<Action> {
    return this.action$.pipe(
      ofType<OpenProjectAction>(OpenProjectAction.type),
      switchMap(({payload: { path }}) => this.projectNameProvider.get(path)
        .pipe(map(name => new AddHistoryItemAction({name, path}))))
    );
  }
}
