import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.navigateToLogin();
  }
}
