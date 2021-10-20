import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../shared/Todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [
    trigger('todoItemAnim', [
      transition(':leave', [
        animate(
          300,
          style({
            opacity: 0,
            height: 0,
            transform: 'scale(0)',
            marginBottom: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  completeTodo(todo: Todo) {
    this.todoService.updateTodo(todo.id, { completed: !todo.completed });
  }
  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
  }
  trackById(index: number, item: Todo){
    return item.id;
  }
}
