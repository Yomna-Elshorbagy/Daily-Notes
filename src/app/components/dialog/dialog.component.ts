import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogData } from '../../core/interfaces/dialog-data';
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
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  private readonly noteService = inject(NotesService);

  noteForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  noteSubmit(form: FormGroup): void {
    this.noteService.handelAddNotes(form.value).subscribe({
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
