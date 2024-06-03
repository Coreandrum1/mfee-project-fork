import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterOutlet, NavbarComponent],
  template: `
    @if (isAuthenticated) {
    <app-navbar></app-navbar>
    }
    <router-outlet />
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  isAuthenticated = true;
}
