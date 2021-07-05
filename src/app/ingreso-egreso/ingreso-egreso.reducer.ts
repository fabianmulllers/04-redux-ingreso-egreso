import { Action, createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../modelos/ingreso-egreso.model';
import { setItems ,unSetItems } from './ingreso-egreso.action';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[]; 
}


export interface AppStateWithIngreso extends AppState{
    ingresosEgresos: State
}

export const initialState: State = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on( setItems, ( state, { items }: any )=> ( { ...state, items: [ ...items ] } ) ),
    on( unSetItems, ( state )=> ( { ...state, items: [] } ) ),


);

export function ingresoEgresoReducer(state: any, action: Action) {
    return _ingresoEgresoReducer(state, action);
}