import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from 'src/app/shared/Todo.model';
import { TodoService } from 'src/app/shared/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  showValidationErrors = false;

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
  }
  onFormSubmit(form: NgForm){
    if(form.valid){
      this.todoService.addTodo(new Todo(form.value.text));
      this.router.navigateByUrl('/todos');
    }else{
      this.showValidationErrors = true;
    }
  }
}
