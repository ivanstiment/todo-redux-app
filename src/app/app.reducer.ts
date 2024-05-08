import { ActionReducerMap, createReducer, on } from '@ngrx/store';
// import { crear } from './todo.actions';

import { Todo } from './todos/models/todo.model';

import { todoReducer } from './todos/todo.reducer';

import { filtroReducer } from './filtro/filtro.reducer';
import { filtrosValidos } from './filtro/filtro.actions';

export interface AppState {
  todos: Todo[],
  filtro: filtrosValidos,
  // usuario: {},
}

export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filtro: filtroReducer
}

// export const estadoInicial: Todo[] = [
//   new Todo("Salvar al mundo")
// ];

// const _appReducer = createReducer(estadoInicial,
//   // esto no se hace porque el state mutaría
//   // on(crear, (state, { texto }) => state.push())
//   // enviamos un nuevo array y envia una nueva instancia
//   on(crear, (state, { texto }) => [...state, new Todo( texto )])
// );

// export function appReducer(state: any, action: any) {
//   return _appReducer(state, action);
// }
