import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { TodosComponent } from './todos/todos.component';
import { NotesComponent } from './notes/notes.component';
import { BookmarkTileComponent } from './bookmarks/bookmark-tile/bookmark-tile.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { NoteCardComponent } from './notes/note-card/note-card.component';
import { FormsModule } from '@angular/forms';
import { EditNoteComponent } from './notes/edit-note/edit-note.component';
import { TodoItemComponent } from './todos/todo-item/todo-item.component';
import { AddTodoComponent } from './todos/add-todo/add-todo.component';
import { EditTodoComponent } from './todos/edit-todo/edit-todo.component';
import { AddBookmarkComponent } from './bookmarks/add-bookmark/add-bookmark.component';
import { ManageBookmarksComponent } from './bookmarks/manage-bookmarks/manage-bookmarks.component';
import { EditBookmarkComponent } from './bookmarks/edit-bookmark/edit-bookmark.component';
import { NotificationComponent } from './shared/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    BookmarksComponent,
    TodosComponent,
    NotesComponent,
    BookmarkTileComponent,
    AddNoteComponent,
    NoteCardComponent,
    EditNoteComponent,
    TodoItemComponent,
    AddTodoComponent,
    EditTodoComponent,
    AddBookmarkComponent,
    ManageBookmarksComponent,
    EditBookmarkComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
