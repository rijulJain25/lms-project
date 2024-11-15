import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RoleState } from "./role.reducer";

export const selectRoleState = createFeatureSelector<RoleState>('role');

export const selectIsInstructor = createSelector(
    selectRoleState,
    (state: RoleState) => state.isInstructor
)