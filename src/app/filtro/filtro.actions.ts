import { createAction, props } from '@ngrx/store';

export type filtrosValidos =
  | filtrosValidosEnum.TODOS
  | filtrosValidosEnum.COMPLETADOS
  | filtrosValidosEnum.PENDIENTES;
// export type filtrosValidos = todos | completados | pendientes;

export enum filtrosValidosEnum {
  TODOS = 'todos',
  COMPLETADOS = 'completados',
  PENDIENTES = 'pendientes',
}

export const setFiltro = createAction(
  '[Filtro] Set Filtro',
  props<{ filtro: filtrosValidos }>()
);
