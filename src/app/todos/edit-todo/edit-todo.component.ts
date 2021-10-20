import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Todo } from 'src/app/shared/Todo.model';
import { TodoService } from 'src/app/shared/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  todo!: Todo;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (paramMap:ParamMap) => {
        const id = paramMap.get('id');
        if(id){
          const todo = this.todoService.getTodo(id);
          if(todo){
            this.todo = todo;
          }
        }
      }
    )
  }
  onFormSubmit(form: NgForm){
    if(form.invalid) return;
    this.todoService.updateTodo(this.todo.id, form.value);
    this.router.navigateByUrl('/todos')
  }
}
