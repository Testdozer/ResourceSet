import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/index";
import { map, switchMap } from "rxjs/internal/operators";
import { OpenProjectAction } from "../../core.module/actions/open-project.action";
import { SelectFolderService } from "../../core.module/services/select-folder.service";
import { ProjectSelectorActionTypes, SelectFolder } from "../actions/actions";

@Injectable()
export class SelectFolderEffect {
  constructor(
    private action$: Actions,
    private selectFolderService: SelectFolderService) {
  }

  @Effect()
  public onSelectFolder$(): Observable<Action> {
    return this.action$.pipe(
      ofType<SelectFolder>(ProjectSelectorActionTypes.SelectFolder),
      switchMap(() => this.selectFolderService.select()
        .pipe(map(path => new OpenProjectAction({path}))))
    );
  }
}
