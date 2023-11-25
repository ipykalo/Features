import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
