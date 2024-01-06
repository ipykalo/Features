import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { CustomErrorStateMatcher } from '../core/forms/error-state-matcher';
import { RoutesConstant } from '../app.routes';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private fb: FormBuilder = inject(FormBuilder);

  public matcher = new CustomErrorStateMatcher();
  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.form?.invalid) {
      throw new Error('Sign Up form is invalid!');
    }
    const formData = this.form.getRawValue();

    this.authService.signup(formData);
  }

  onNavigateToLogin(): void {
    this.router.navigateByUrl(RoutesConstant.LOGIN);
  }
}
