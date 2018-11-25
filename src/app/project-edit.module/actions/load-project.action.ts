import { Action } from "@ngrx/store";
import { SerializableAction } from "../../shared/serializable-actions/serializable-action.decorator";

@SerializableAction()
export class LoadProjectAction implements Action {
  public static type = "[Project] Load project";
  public readonly type = LoadProjectAction.type;

  constructor(public payload: { path: string }) {

  }
}
