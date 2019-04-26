import { Action } from '@ngrx/store';

//Activa el un loading
export const ACTIVAR_LOADING = '[UI Loading] Cargando...';

export class ActivarLoadingAction implements Action {
    readonly type = ACTIVAR_LOADING;
}

//Desactivar el loading
export const DESACTIVAR_LOADING = '[UI Loading] Fin de carga...';

export class DesactivarLoadingAction implements Action {
    readonly type = DESACTIVAR_LOADING;
}

//Acciones permitidas de este action
export type actions = ActivarLoadingAction | DesactivarLoadingAction;