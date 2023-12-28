import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() showLogout: boolean = false;
  @Input() showLogin: boolean = false;
  @Input() showMenu: boolean = false;

  @Output() toggleMenu: EventEmitter<void> = new EventEmitter();
  @Output() logout: EventEmitter<void> = new EventEmitter();
  @Output() login: EventEmitter<void> = new EventEmitter();
}
