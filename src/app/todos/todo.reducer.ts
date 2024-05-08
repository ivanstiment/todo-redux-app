import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import {
  borrar,
  crear,
  editar,
  limpiarTodos,
  toggle,
  toggleAll,
} from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje de IronMan'),
  new Todo('Robar escudo de capitán América'),
];

const _todoReducer = createReducer(
  estadoInicial,
  // esto no se hace porque el state mutaría
  // on(crear, (state, { texto }) => state.push())
  // enviamos un nuevo array y envia una nueva instancia
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),

  // Solo devolver los todos que tengan el completado = false
  on(limpiarTodos, (state) => state.filter((todo) => !todo.completado)),

  on(borrar, (state, { id }) => state.filter((todo) => todo.id !== id)),

  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        // Si se hiciera así , se estaría mutando el objeto inicial
        // todo.completado = !todo.completado
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),

  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        };
      } else {
        return todo;
      }
    });
  }),

  on(toggleAll, (state, { completado }) =>
    state.map((todo) => {
      return {
        ...todo,
        completado: completado,
      };
    })
  )
);

export function todoReducer(state: any, action: any) {
  return _todoReducer(state, action);
}
