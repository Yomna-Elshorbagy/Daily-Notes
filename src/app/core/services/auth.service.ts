import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../interfaces/auth';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private readonly httpClint = inject(HttpClient);
  private readonly router = inject(Router)
  userToken: BehaviorSubject<any> = new BehaviorSubject(null);

  setUserToken():void{
    let token = localStorage.getItem('token')
    if(token !== null){
      this.userToken.next(token)
    }
  }

  handelRegister(userInfo: Auth): Observable<any> {
    return this.httpClint.post(environment.baseUrl + 'signup', userInfo);
  }

  handelLosgin(userInfo: Auth): Observable<any> {
    return this.httpClint.post(environment.baseUrl + 'signin', userInfo);
  }

  logout():void {
    localStorage.removeItem('token')
    this.router.navigate(['signin'])
  }
}
