import { createFeatureSelector } from "@ngrx/store";
import { PROJECT_SELECTOR_FEATURE_NAME } from "../project-selector.feature-name";
import { IProjectSelectorState } from "../store/project-selector.state";

export const projectSelectorFeatureProjector =
  createFeatureSelector<IProjectSelectorState>(PROJECT_SELECTOR_FEATURE_NAME);
