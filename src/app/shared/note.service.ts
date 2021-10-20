import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Note } from './Note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy{
  notes: Note[] = [];
  storageSub: Subscription;

  constructor() {

    this.loadState();

    // ONLY LOGS IN OTHER WINDOW
    this.storageSub = fromEvent(window, 'storage').subscribe((event: any) => {
      // console.log('Storage Event Fired!');
      // console.log(event);
      if(event.key === 'notes') this.loadState();
    });

  }
  ngOnDestroy(){
    if(this.storageSub) this.storageSub.unsubscribe();
  }

  getNotes(){
    return this.notes;
  }
  getNote(id: string){
    const note = this.notes.find(n => n.id === id);
    return note;
  }
  addNote(note: Note){
    this.notes.push(note);
    this.saveState();
  }
  updateNote(id: string, updatedFields: Partial<Note>){
    const note = this.getNote(id);
    Object.assign(note, updatedFields);
    this.saveState();
  }
  deleteNote(id: string){
    const noteIndex = this.notes.findIndex(n => n.id ===id)
    if (noteIndex === -1) return;
    this.notes.splice(noteIndex, 1);
    this.saveState()
  }
  saveState(){
    localStorage.setItem('notes', JSON.stringify(this.notes))
  }
  loadState(){
    try{
    const unparsedNotesInstorage = localStorage.getItem('notes')
    if(!unparsedNotesInstorage) return;
    const notesInstorage = JSON.parse(unparsedNotesInstorage);
    this.notes.length = 0; // Clear notes array while keeping the reference
    this.notes.push(...notesInstorage);
    }catch(e){
      console.log('There was an error retrieving the notes from localstorage');
      console.log(e);
    }
  }
}
