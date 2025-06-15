import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { DialogComponent } from '../../components/dialog/dialog.component';
import { NotesService } from '../../core/services/notes.service';
import { NoteData } from '../../core/interfaces/note-data';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NgStyle, SideNavComponent, SearchPipe, FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  private readonly noteService = inject(NotesService);
  allNotes: NoteData[] = [];
  searchInput: string = '';

  ngOnInit(): void {
    this.noteService.getUserNotes().subscribe({
      next: (res) => {
        console.log(res);
        this.allNotes = res.notes;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openDialog(noteData?: NoteData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '300px',
      width: '500px',
      data: {
        title: noteData?.title,
        content: noteData?.content,
        _id: noteData?._id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  updateData(noteData: NoteData, noteIndex: number) {
    this.openDialog({
      title: noteData.title,
      content: noteData.content,
      _id: noteData._id,
    });
  }

  deleteData(deleteNote: string, noteIndex: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
        }
      })
      .then(() => {
        this.noteService.handelDeleteNote(deleteNote).subscribe({
          next: (res) => {
            console.log(res);
            this.allNotes.slice(noteIndex, 1);
            this.ngOnInit();
          },
          error: (err) => {
            console.log(err);
          },
        });
      });
  }
}
