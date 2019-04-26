import * as fromUI from './ui.actions';

export interface State {
    isLoading: boolean;
};


const initState: State = {
    isLoading: false
};

export function uiReducer(state = initState, action: fromUI.actions): State {

    switch (action.type) {
        //Activar el loading
        case fromUI.ACTIVAR_LOADING:
            return {
                isLoading: true
            };
            break;
        //Desactivar el loading
        case fromUI.DESACTIVAR_LOADING:
            return {
                isLoading: false
            };
            break;
        default:
            return state;
            break;
    }

};