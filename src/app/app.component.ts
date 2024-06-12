import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterOutlet, NavbarComponent, LoginFormComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet />
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  authService = inject(AuthService);
  isAuthenticated = this.authService.getCurrentUser() !== '';
  router: Router = inject(Router);

  constructor() {
    if (this.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    //
  }
}
