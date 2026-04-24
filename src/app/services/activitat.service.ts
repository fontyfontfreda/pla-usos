import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Adreca } from '../models/adreca.model';
import { Activitat } from '../models/activitat.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Epigraf } from '../models/epigraf.model';

const ERR_TOKEN = 470;

@Injectable({
  providedIn: 'root',
})
export class ActivitatService {
  private API_URL = `${environment.apiUrl}/activitats`; // Enllaç al backend

  constructor(private authService: AuthService) {}

  async getActivitats(adreca: Adreca | null): Promise<any[]> {
    try {
      const response: AxiosResponse<any[]> = await axios.get(
        this.API_URL + '/' + adreca?.DOMCOD,
      );
      return response.data;
    } catch (error) {
      console.error('Error obtenint activitats:', error);
      return [];
    }
  }

  async sendActivitat(dades: any): Promise<{ blob: Blob; is_apte: boolean }> {
    try {
      const response = await axios.post(`${this.API_URL}/consulta`, {
        dades: { dades },
      });

      console.log('response.data:', response.data); // Per veure què retorna el backend

      let { pdf, is_apte } = response.data;

      // Comprovem que pdf existeix i és una cadena
      if (typeof pdf !== 'string') {
        throw new Error('El camp pdf no és una cadena vàlida o no existeix.');
      }

      // Elimina el prefix si hi és (opcional, segons com ho retorni el backend)
      if (pdf.startsWith('data:application/pdf;base64,')) {
        pdf = pdf.replace(/^data:application\/pdf;base64,/, '');
      }

      // Convertim el base64 a binari
      const binary = atob(pdf);
      const len = binary.length;
      const buffer = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        buffer[i] = binary.charCodeAt(i);
      }

      // Creem el Blob PDF
      const blob = new Blob([buffer], { type: 'application/pdf' });

      return { blob, is_apte };
    } catch (error) {
      console.error('Error al processar pdf:', error);
      throw error;
    }
  }

  async getAllActivitats(): Promise<Record<string, Record<string, string[]>>> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<Record<string, Record<string, string[]>>> =
        await axios.get(this.API_URL, {
          headers: {
            Authorization: `Bearer ${token}`, // Afegir el token a l'encapçalament
          },
        });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == ERR_TOKEN) {
          this.authService.logout();
        }
      } else {
        console.error('Error obtenint activitats:', error);
      }
      return {};
    }
  }

  async getActivitat(
    activitat: string,
    subgrup: string,
    grup: string,
  ): Promise<any[]> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any[]> = await axios.get(
        `${this.API_URL}/activitat/${activitat}/${subgrup}/${grup}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == ERR_TOKEN) {
          this.authService.logout();
        }
      } else {
        console.error('Error obtenint activitat: ' + activitat, error);
      }
      return [];
    }
  }

  async getSubgrup(subgrup: string, grup: string): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.get(
        `${this.API_URL}/subgrup/${subgrup}/${grup}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == ERR_TOKEN) {
          this.authService.logout();
        }
      } else {
        console.error('Error obtenint el subgrup: ' + subgrup, error);
      }
      return [];
    }
  }

  async getGrup(grup: string): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.get(
        `${this.API_URL}/grup/${grup}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == ERR_TOKEN) {
          this.authService.logout();
        }
      } else {
        console.error('Error obtenint el subgrup: ' + grup, error);
      }
      return [];
    }
  }

  async getZones() {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.put(
        this.API_URL + `/zones`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == ERR_TOKEN) {
          this.authService.logout();
        }
      } else {
        throw error;
      }
    }
  }

  async getArees() {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.put(
        this.API_URL + `/arees`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == ERR_TOKEN) {
          this.authService.logout();
        }
      } else {
        throw error;
      }
    }
  }

  async createActivitat(activitat: any) {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.post(
        this.API_URL + `/activitat`,
        { activitat },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == ERR_TOKEN) {
          this.authService.logout();
        }
      } else {
        throw error;
      }
    }
  }

  async createGrup(grup: any) {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.post(
        this.API_URL + `/grup`,
        { grup },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == ERR_TOKEN) {
          this.authService.logout();
        }
      } else {
        throw error;
      }
    }
  }

  async createSubgrup(subgrup: any, grup: string) {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.post(
        this.API_URL + `/subgrup`,
        { grup, subgrup },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == ERR_TOKEN) {
          this.authService.logout();
        }
      } else {
        throw error;
      }
    }
  }

  async updateActivitat(activitat: any): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.put(
        this.API_URL + `/activitat`,
        { activitat },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == ERR_TOKEN) {
          this.authService.logout();
        }
      } else {
        throw error;
      }
    }
  }
}
