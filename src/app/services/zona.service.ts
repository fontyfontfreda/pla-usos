//src/app/services/zona.service.ts
import {Injectable} from '@angular/core';
import axios, {AxiosResponse} from 'axios';

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
  private API_URL = 'http://localhost:3000/api/zones'; // Enllaç al backend

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
      const response: AxiosResponse<any> = await axios.delete(`${this.API_URL}/area`, {
        data: { codi_area }, // Enviem les dades al cos de la sol·licitud
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteZona(codi_zona: number): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.delete(`${this.API_URL}/zona`, {
        data: { codi_zona }, // Enviem les dades al cos de la sol·licitud
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
