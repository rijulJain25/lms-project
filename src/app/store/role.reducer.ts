import { createReducer, on } from "@ngrx/store";
import { toggleRole } from "./role.actions";


export interface RoleState{
    isInstructor: boolean;
}

export const initialState: RoleState = {
    isInstructor: false,
}

export const roleReducer = createReducer(
    initialState,
    on(toggleRole, (state) =>({
        ...state,
        isInstructor: !state.isInstructor,
    }))
)