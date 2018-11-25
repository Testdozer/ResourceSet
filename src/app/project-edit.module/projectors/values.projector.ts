import { createSelector } from "@ngrx/store";
import { projectFeatureProjector } from "./project.feature-projector";

export const valuesProjector = createSelector(projectFeatureProjector, state => state.values);
