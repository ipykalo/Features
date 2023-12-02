import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AuthService, Session } from './auth.service';
import { Router } from '@angular/router';
import { RoutesConstant } from '../constants/routes.constant';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public form = inject(FormBuilder).group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  public matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    const { email, password } = this.form.getRawValue();
    if (!email || !password) {
      return;
    }
    this.authService.login(email, password).subscribe((session: Session) => {
      if (session.access_token) {
        this.router.navigate([RoutesConstant.Home]);
      }
    });
  }
}
