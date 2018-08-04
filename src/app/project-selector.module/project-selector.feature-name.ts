import { nameof } from "../shared/nameof";
import { IProjectSelectorStore } from "./store/project-selector.store";

export const PROJECT_SELECTOR_FEATURE_NAME = nameof<IProjectSelectorStore>("projectSelector");
