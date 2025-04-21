// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false;
  private API_URL = 'http://localhost:3000/api/login'; // URL del login

  constructor(private router: Router) {}

  login(username: string, password: string): Promise<boolean> {
    return axios
      .post<any>(this.API_URL, { username, password })
      .then((response: AxiosResponse<any>) => {
        if (response.data.token) {
          localStorage.setItem('jwt_token', response.data.token); // Desa el token a localStorage
          this.loggedIn = true;
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error('Error en login', error);
        return false;
      });
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('jwt_token'); // Elimina el token en logout
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }
}
