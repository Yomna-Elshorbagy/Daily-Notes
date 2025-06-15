import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteData } from '../interfaces/note-data';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

  private readonly httpClient = inject(HttpClient)

  handelAddNotes(newNote: NoteData):Observable<any>{
    return this.httpClient.post(environment.noteUrl, newNote, {
      headers:{
        token: localStorage.getItem('token') || ''
      }
    })
  }

  getUserNotes():Observable<any>{
    return this.httpClient.get(environment.noteUrl, {
      headers:{
        token: localStorage.getItem('token') || ''
      }
    })
  }
}
