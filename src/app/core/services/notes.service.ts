import { NoteData } from './../interfaces/note-data';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor() {}

  private readonly httpClient = inject(HttpClient);

  handelAddNotes(newNote: NoteData): Observable<any> {
    return this.httpClient.post(environment.noteUrl, newNote, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }

  getUserNotes(): Observable<any> {
    return this.httpClient.get(environment.noteUrl, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }

  handelUpdate(noteData: NoteData, noteId: string): Observable<any> {
    return this.httpClient.put(environment.noteUrl + `/` + noteId, noteData, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }

  handelDeleteNote(noteId: string): Observable<any> {
    return this.httpClient.delete(environment.noteUrl + `/` + noteId, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }
}
