import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookmarkComponent } from './bookmarks/add-bookmark/add-bookmark.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { EditBookmarkComponent } from './bookmarks/edit-bookmark/edit-bookmark.component';
import { ManageBookmarksComponent } from './bookmarks/manage-bookmarks/manage-bookmarks.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { EditNoteComponent } from './notes/edit-note/edit-note.component';
import { NotesComponent } from './notes/notes.component';
import { AddTodoComponent } from './todos/add-todo/add-todo.component';
import { EditTodoComponent } from './todos/edit-todo/edit-todo.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: 'bookmarks', component: BookmarksComponent, data: { tabNum: 1 } },
  { path: 'bookmarks/add', component: AddBookmarkComponent},
  { path: 'bookmarks/manage', component: ManageBookmarksComponent, children:[
    { path: ':id', component: EditBookmarkComponent},
  ]},
  { path: 'todos', component: TodosComponent, data: { tabNum: 2 } },
  { path: 'todos/add', component: AddTodoComponent },
  { path: 'todos/:id', component: EditTodoComponent },
  { path: 'notes', component: NotesComponent, data: { tabNum: 3 } },
  { path: 'notes/add', component: AddNoteComponent },
  { path: 'notes/:id', component: EditNoteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
