import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../modelos/ingreso-egreso.model';

export const unSetItems = createAction('[IngresoEgreso] Unset Item');

export const setItems = createAction('[IngresoEgreso] Set Item',
props<{items: IngresoEgreso }>() );
