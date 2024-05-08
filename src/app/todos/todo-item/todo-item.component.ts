import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as actions from '../todo.actions';

import { AppState } from '../../app.reducer';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = new Todo('');
  @ViewChild('inputFisico') txtInputFisico: ElementRef<HTMLInputElement> =
    {} as ElementRef;

  public checkCompletado: FormControl = new FormControl(this.todo.completado);
  public txtInput: FormControl = new FormControl(this.todo.texto, Validators.required);

  public editando: boolean = false;

  constructor(private store: Store<AppState>) {
    // this.checkCompletado = new FormControl(this.todo.completado);
    // this.txtInput = new FormControl(this.todo.texto, Validators.required);
  }

  ngOnInit(): void {
    // console.log(this.txtInputFisico);
    // this.checkCompletado = new FormControl(this.todo.completado);
    // this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.checkCompletado.valueChanges.subscribe((valor) => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    });
  }

  public editar(): void {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  public terminarEdicion(): void {
    this.editando = false;

    if (this.txtInput.invalid) {
      return;
    }
    if (this.txtInput.value === this.todo.texto) {
      return;
    }

    this.store.dispatch(
      actions.editar({
        id: this.todo.id,
        texto: this.txtInput.value,
      })
    );
  }

  public borrar(): void {
    this.store.dispatch(actions.borrar({ id: this.todo.id }));
  }
}
