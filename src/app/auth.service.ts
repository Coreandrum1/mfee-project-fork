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
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    return null;
  }

  async register(userSent: User): Promise<any> {
    const users = await fetch(`${this.API_URL}`);
    const usersList = (await users.json()) ?? [];
    const user = usersList.find((u: User) => {
      return u.email === userSent.email;
    });
    if (user) {
      return null;
    }

    const res = await fetch(`${this.API_URL}`, {
      method: 'POST',
      body: JSON.stringify(userSent),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newUserList = (await res.json()) ?? [];
    console.log(newUserList);
    localStorage.setItem('currentUser', JSON.stringify(newUserList[0]));
    return newUserList;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): any {
    localStorage.getItem('currentUser');
    return localStorage.getItem('currentUser') ?? '';
  }

  getUserId(): string {
    const user = this.getCurrentUser();
    return user?.id ?? '';
  }
}
