import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { RoutesConstant } from '../constants/routes.constant';
import { DecodedToken } from '../shared/types/decoded-token.type';
import { BrowserStorageService } from '../services/browser-storage.service';

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
    private router: Router,
    private browserStorageService: BrowserStorageService
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
    this.browserStorageService.remove('access_token');
    this.browserStorageService.remove('expires_at');

    this.router.navigateByUrl(RoutesConstant.LOGIN);
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): number {
    const expiration = this.browserStorageService.get('expires_at');
    const expiresAt = JSON.parse(expiration as string);

    return new Date(expiresAt).valueOf();
  }

  getTokenData(value?: string): DecodedToken | null {
    const token: string | null = value || this.browserStorageService.get('access_token');

    if (!token) {
      return null;
    }
    return this.decodeToken(token);
  }

  private setSession(authResult: Session): void {
    const date = new Date();
    date.setSeconds(date.getSeconds() + authResult.expiresIn);
    const expiresAt = date.valueOf();

    this.browserStorageService.set('access_token', authResult.access_token);
    this.browserStorageService.set('expires_at', JSON.stringify(expiresAt));
  }

  private decodeToken(token: string): DecodedToken | null {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  }
}
