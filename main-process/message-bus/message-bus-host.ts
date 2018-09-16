import { Injectable } from "injection-js";
import { filter, map, tap, merge, mergeMap } from "rxjs/operators";
import { AddHistoryItemAction } from "src/app/core.module/ipc-actions/add-history-item.action";
import { OpenProjectAction } from "src/app/core.module/ipc-actions/open-project.action";
import { ProjectNameProvider } from "../package-name/project-name.provider";
import { ActionBuilder } from "./action-builder";
import { MessageBus } from "./message.bus";
import { forkJoin, combineLatest, of } from "rxjs";
import { ofType } from "@ngrx/effects";

@Injectable()
export class MessageBusHost {
  constructor(
    private messageBus: MessageBus,
    private actionBuilder: ActionBuilder,
    private projectNameProvider: ProjectNameProvider) {
  }

  public start() {
    this.messageBus.messages$()
      .pipe(
        map(({action, sender}) => ({action1: this.actionBuilder.get(action), sender})),
        mergeMap(({action1, sender}) => {
          return combineLatest(
            of(action1)
              .pipe(
                ofType<OpenProjectAction>(OpenProjectAction.type),
                // filter(action => action.type === OpenProjectAction.type),
                map(action => (action as OpenProjectAction)),
                map(action => action.payload.path),
                map(path => ({path, name: this.projectNameProvider.get(path)})),
                map(({path, name}) => new AddHistoryItemAction({name, path}))
              ),
              of(sender)
            );
        }),
        map(([action, sender]) => sender(action))
      )
     .subscribe( () => undefined );
  }
}
