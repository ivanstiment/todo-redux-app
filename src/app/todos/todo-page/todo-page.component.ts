import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css',
})
export class TodoPageComponent {
  public completado: boolean = false;

  constructor(private store: Store<AppState>) {}

  public toggleAll(): void {
    this.completado = !this.completado;
    console.log(this.completado);

    this.store.dispatch(actions.toggleAll({ completado: this.completado }));
  }
}
