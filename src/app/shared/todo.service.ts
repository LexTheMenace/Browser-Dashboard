import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Todo } from './Todo.model';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy {
  todos: Todo[] = [];
  storageSub: Subscription;

  constructor() {

    this.loadState();


    this.storageSub = fromEvent<StorageEvent>(window, 'storage').pipe(
      filter((event): event is StorageEvent => event instanceof StorageEvent)
    ).subscribe((event: StorageEvent) => {
      console.log('Storage Event Fired!');
      console.log(event);
      if(event.key === 'todos') this.loadState();
    });
   }
   ngOnDestroy(){
     this.storageSub.unsubscribe();
   }

  getTodos(){
    return this.todos;
  }
  getTodo(id: string){
    return this.todos.find(t=> t.id === id);
  }

  addTodo(todo: Todo){
    this.todos.push(todo)
    this.saveState()
  }

  updateTodo(id: string, updatedFields: Partial<Todo>){
    const todo = this.getTodo(id);
    Object.assign(todo, updatedFields);
    this.saveState()
  }

  deleteTodo(id: string){
    const index = this.todos.findIndex(t => t.id === id);
    if(index === -1) return;
    this.todos.splice(index,1);
    this.saveState()
  }
  saveState(){
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }
  loadState(){
    try{
    const unparsedTodosInstorage = localStorage.getItem('todos')
    if(!unparsedTodosInstorage) return;
    const todosInstorage = JSON.parse(unparsedTodosInstorage);
    this.todos.length = 0; // Clear todos array while keeping the reference
    this.todos.push(...todosInstorage);
    }catch(e){
      console.log('There was an error retrieving the todos from localstorage');
      console.log(e);
    }
  }
}
