import { Injectable } from '@angular/core';
import { User } from './user.type';
import { AuthService } from '../login/auth.service';
import { DecodedToken } from '../shared/types/decoded-token.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: User | undefined;

  constructor(private authService: AuthService) {}

  get user(): User | undefined {
    if (this._user) {
      return this._user;
    }
    const decodedUser: DecodedToken | null = this.authService.getTokenData();
    if (!decodedUser) {
      return;
    }
    return (this.user = decodedUser.profile);
  }

  set user(user: User) {
    this._user = user;
  }
}
