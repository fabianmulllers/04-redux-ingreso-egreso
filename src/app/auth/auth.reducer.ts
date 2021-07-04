import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from '../modelos/usuario.model';
import { setUser, unSetUser } from './auth.actions';

export interface State {
    user: Usuario; 
}

export const initialState: State = {
   user: new Usuario('','','')
}

const _authReducer = createReducer(initialState,

    on( setUser, (state, { user }) => {
       return {...state, user };
    }),
    on( unSetUser, (state) => ({ ...state, user: new Usuario( '1', '2', '3') })),


);

export function authReducer(state: any, action: Action) {
    return _authReducer(state, action);
}