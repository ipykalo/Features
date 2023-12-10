import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { RoutesConstant } from '../constants/routes.constant';

export type Session = {
  access_token: string;
  expiresIn: number;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public isLoggedIn(): boolean {
    return Date.now() <= this.getExpiration();
  }

  login(email: string, password: string): Observable<Session> {
    return this.http
      .post<Session>(`${this.url}auth/login`, { email, password })
      .pipe(
        shareReplay(),
        tap(resp => {
          this.setSession(resp);
        })
      );
  }

  signup(obj: any): void {
    this.http.post<Session>(`${this.url}auth/signup`, obj).subscribe(resp => {
      if (resp) {
        this.router.navigateByUrl(RoutesConstant.LOGIN);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');

    this.router.navigateByUrl(RoutesConstant.LOGIN);
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): number {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration as string);

    return new Date(expiresAt).valueOf();
  }

  private setSession(authResult: Session) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + authResult.expiresIn);
    const expiresAt = date.valueOf();

    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
  }
}
