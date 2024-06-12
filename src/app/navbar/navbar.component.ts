import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav>
      <section [className]="'navbar-brand'">
        <div>Logo</div>
      </section>
      <section [className]="'navbar-menu'">
        <a [routerLink]="'/'">Categories</a>
        <a [routerLink]="'/login'">Login</a>
        <a (click)="onLogout()">Logout</a>
      </section>
    </nav>
  `,
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  onLogout = () => {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  };
}
