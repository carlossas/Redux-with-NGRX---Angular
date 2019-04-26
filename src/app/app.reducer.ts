import * as fromUI from './shared/ui.reducers';
import * as fromAuth from './auth/auth.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;

};

//Permite fucionar varios reducers en uno solo
export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer
};