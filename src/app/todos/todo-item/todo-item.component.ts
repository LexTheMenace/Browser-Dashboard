import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/shared/Todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() deleteTodoItem: EventEmitter<void> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }
  deleteTodo(){
    this.deleteTodoItem.emit();
  }

}
