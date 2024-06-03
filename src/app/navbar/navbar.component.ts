import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
        <a [routerLink]="'/'">Home</a>
        <a [routerLink]="'/login'">About</a>
      </section>
    </nav>
  `,
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
