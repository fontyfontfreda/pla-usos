//src/app/services/zona.service.ts
import {Injectable} from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import { AuthService } from './auth.service';
import {environment} from '../../environments/environment';

interface Area {
  codi_area: string;
  descripcio_area: string;
}

interface Zona {
  codi_zona: number;
  descripcio_zona: string;
  arees: Area[];
}

@Injectable({
  providedIn: 'root'
})

export class ZonaService {
  private API_URL = `${environment.apiUrl}/zones`; // Enllaç al backend

  constructor(private authService: AuthService) {}

  async getZones(): Promise<Zona[]> {
    try {
      const response: AxiosResponse<any[]> = await axios.get(this.API_URL);
      return response.data;
    } catch (error) {
      console.error('Error obtenint zones:', error);
      return [];
    }
  }

  async deleteArea(codi_area: string): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.delete(`${this.API_URL}/area`, {
        headers: {
          Authorization: `Bearer ${token}` // Afegir el token a l'encapçalament
        },
        data: { codi_area }, // Enviem les dades al cos de la sol·licitud
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteZona(codi_zona: number): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.delete(`${this.API_URL}/zona`, {
        headers: {
          Authorization: `Bearer ${token}` // Afegir el token a l'encapçalament
        },
        data: { codi_zona }, // Enviem les dades al cos de la sol·licitud
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addZona(zona: Zona): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.post(
        `${this.API_URL}/zona`,
        { zona }, // <-- Aquest és el body
        {
          headers: {
            Authorization: `Bearer ${token}`, // <-- Aquest és l'encapçalament
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addArea(area: Area): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.post(
        `${this.API_URL}/area`,
        { area }, // <-- Aquest és el body
        {
          headers: {
            Authorization: `Bearer ${token}`, // <-- Aquest és l'encapçalament
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}
