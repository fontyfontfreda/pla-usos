// src/app/services/usuari.service.ts
import {Injectable} from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {AuthService} from './auth.service';
import {Usuari} from '../models/usuari.model';
import {environment} from '../../environments/environment'; // Per obtenir el token

@Injectable({
  providedIn: 'root'
})
export class UsuariService {
  private API_URL = `${environment.apiUrl}/usuaris`; // Enllaç al backend

  constructor(private authService: AuthService) {
  }

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

  async addUsuari(usuari: Usuari): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${environment.apiUrl}/register`,
        {username: usuari.usuari, password: usuari.contrasenya}, // <-- Aquest és el body
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateContrasenya(usuari: string, novaContrasenya: string): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.put(
        this.API_URL+`/${usuari}/contrasenya`,
        { novaContrasenya },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteUsuari(usuari: string): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.delete(
        this.API_URL+`/${usuari}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}
