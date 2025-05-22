import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../interfaces/auth';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private readonly httpClint = inject(HttpClient);
  handelRegister(userInfo: Auth): Observable<any> {
    return this.httpClint.post(environment.baseUrl + 'signup', userInfo);
  }
}
