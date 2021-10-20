import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from 'src/app/shared/Note.model';
import { NoteService } from 'src/app/shared/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  showValidationErrors: boolean = false;

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm){
    if(form.valid){
      const { title, content } = form.value;
    this.noteService.addNote(new Note(title,content));
    this.router.navigateByUrl('/notes')
  }else{
    this.showValidationErrors = true;
    // show err messages
  }
  }

}
