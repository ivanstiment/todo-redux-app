import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from './../../filtro/filtro.actions';
import { limpiarTodos } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css',
})
export class TodoFooterComponent implements OnInit {
  filtroActual: actions.filtrosValidos = actions.filtrosValidosEnum.TODOS;
  filtros: actions.filtrosValidos[] = [
    actions.filtrosValidosEnum.TODOS,
    actions.filtrosValidosEnum.COMPLETADOS,
    actions.filtrosValidosEnum.PENDIENTES,
  ];

  pendientes: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.select('filtro').subscribe((filtro) => {
    //   console.log(filtro);
    //   this.filtroActual = filtro;
    // });
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes   = state.todos.filter(todo => !todo.completado).length;
    });
  }

  public cambiarFiltro(filtro: actions.filtrosValidos): void {
    console.log(filtro);
    // this.store.dispatch(actions.setFiltro({filtro: filtro}))
    this.store.dispatch(actions.setFiltro({ filtro }));
  }

  public limpiarCompletados(): void {
    this.store.dispatch(limpiarTodos());
  }
}
