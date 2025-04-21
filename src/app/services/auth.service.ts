// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/login'; // URL del login

  constructor(private router: Router) {}

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response: AxiosResponse<any> = await axios.post(this.API_URL, { username, password });

      if (response.data.token) {
        // Guarda el token al localStorage
        localStorage.setItem('token', response.data.token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error en login', error);
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
