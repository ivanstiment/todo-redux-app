import { createReducer, on } from '@ngrx/store';
import { setFiltro, filtrosValidos, filtrosValidosEnum } from './filtro.actions';


export const initialState = filtrosValidosEnum.TODOS;

const _filtroReducer = createReducer(initialState,
  on( setFiltro , (state, { filtro }) => filtro ),

);

export function filtroReducer(state: any, action: any) {
  return _filtroReducer(state, action);
}
