import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../../components/dialog/dialog.component';
import { NotesService } from '../../core/services/notes.service';
import { NoteData } from '../../core/interfaces/note-data';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NgStyle, SideNavComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  private readonly noteService = inject(NotesService);
  allNotes: NoteData[] = [];

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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '350px',
      width: '500px',
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
}
