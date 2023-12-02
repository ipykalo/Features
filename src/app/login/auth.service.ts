import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

export type Session = {
  access_token: string;
  expiresIn: number;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Session> {
    const session: Session = { access_token: 'token', expiresIn: 60 };
    this.setSession(session);

    return of(session);
    // return this.http
    //   .post('/api/login', { email, password })
    //   .pipe(shareReplay());
  }

  private setSession(authResult: Session) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + authResult.expiresIn);
    const expiresAt = date.valueOf();

    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    return Date.now() <= this.getExpiration();
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): number {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration as string);

    return new Date(expiresAt).valueOf();
  }
}
