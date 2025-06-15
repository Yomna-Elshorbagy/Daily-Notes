import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoteData } from '../../core/interfaces/note-data';
import { NotesService } from '../../core/services/notes.service';

@Component({
  selector: 'app-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  private readonly noteService = inject(NotesService);
  noteForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteData
  ) {
    this.noteForm = new FormGroup({
      title: new FormControl(this.data.title ? this.data.title : ''),
      content: new FormControl(this.data.content ? this.data.content : ''),
    });
  }

  noteSubmit(form: FormGroup): void {
    if (!this.data._id) {
      this.addNote(form.value);
    } else {
      this.updateNote(form.value);
    }
  }

  addNote(newNote: NoteData): void {
    this.noteService.handelAddNotes(newNote).subscribe({
      next: (res) => {
        this.dialogRef.close();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateNote(updateNote: NoteData): void {
    this.noteService.handelUpdate(updateNote, this.data._id).subscribe({
      next: (res) => {
        this.dialogRef.close();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
