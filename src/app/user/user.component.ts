import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { User } from './user.type';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user: WritableSignal<User | null | undefined> = signal(null);
  constructor(private userSefvice: UserService) {}

  ngOnInit(): void {
    this.user.set(this.userSefvice.user);
  }
}
