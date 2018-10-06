import { Action } from "@ngrx/store";
import { IpcMainDispatchableAction } from "../../shared/ipc-main-dispatchable.actions/ipc-main-dispatchable.decorator";
import { SerializableAction } from "../../shared/serializable-actions/serializable-action.decorator";

@SerializableAction()
@IpcMainDispatchableAction()
export class OpenProjectAction implements Action {
  public static readonly type = "[App] OpenProject";
  public readonly type = OpenProjectAction.type;

  constructor(public payload: { path: string }) {

  }
}
