// auth.service.ts
import { Injectable } from '@angular/core';
import { User } from '../assets/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:3000/users';

  constructor() {}

  async login(email: string, password: string): Promise<any> {
    const users = await fetch(`${this.API_URL}`);
    const usersList = (await users.json()) ?? [];
    const user = usersList.find((u: User) => {
      return u.email === email;
    });
    if (user && user.password === password) {
      localStorage.setItem('currentUser', user);
      return user;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): any {
    return localStorage.getItem('currentUser') ?? '';
  }
}
