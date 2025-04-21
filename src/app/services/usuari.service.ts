// src/app/services/usuari.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { AuthService } from './auth.service'; // Per obtenir el token

@Injectable({
  providedIn: 'root'
})
export class UsuariService {
  private API_URL = 'http://localhost:3000/api/usuaris'; // Enllaç al backend

  constructor(private authService: AuthService) {}

  async getUsuaris(): Promise<any[]> {
    try {
      const token = this.authService.getToken(); // Recuperar el token
      const response: AxiosResponse<any[]> = await axios.get(this.API_URL, {
        headers: {
          Authorization: `Bearer ${token}` // Afegir el token a l'encapçalament
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error obtenint usuaris:', error);
      return [];
    }
  }
}
