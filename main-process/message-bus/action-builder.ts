import { Action } from "@ngrx/store";
import { Injectable } from "injection-js";
import { AddHistoryItemAction } from "src/app/core.module/ipc-actions/add-history-item.action";
import { OpenProjectAction } from "src/app/core.module/ipc-actions/open-project.action";

@Injectable()
export class ActionBuilder {
  private actionStore: any = {};

  constructor() {
    this.actionStore[AddHistoryItemAction.type] = AddHistoryItemAction;
    this.actionStore[OpenProjectAction.type] = OpenProjectAction;
  }

  public get(opts): Action {
    const actionType = opts.type;
    if (actionType === undefined ||
      this.actionStore[actionType] === undefined ||
      this.actionStore[actionType] === null) {
        throw new Error(`Action type is not in the ActionStore`);
    }
    let payload: any;
    if (opts.payload !== undefined) {
      payload = opts.payload;
    }
    return new this.actionStore[actionType](payload);
  }
}
