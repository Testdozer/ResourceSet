import { createFeatureSelector } from "@ngrx/store";
import { PROJECT_FEATURE_NAME } from "../project.feature-name";
import { IProjectState } from "../store/project.state";

export const projectFeatureProjector =
  createFeatureSelector<IProjectState>(PROJECT_FEATURE_NAME);
