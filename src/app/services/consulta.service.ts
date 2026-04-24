//src/app/services/consulta.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { AuthService } from './auth.service';
import { Consulta } from '../models/consulta.model';
import { environment } from '../../environments/environment';
const ERR_TOKEN = 470;
@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  private API_URL = `${environment.apiUrl}/consultes`; // Enllaç al backend

  constructor(private authService: AuthService) {}

  async getConsultes(): Promise<Consulta[]> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any[]> = await axios.get(this.API_URL, {
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
        console.error('Error obtenint consultes:', error);
      }
      return [];
    }
  }

  async generarPDF(consultaId: number): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<Blob> = await axios.get(
        `${this.API_URL}/generarPDF/${consultaId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Afegir el token a l'encapçalament
          },
          responseType: 'blob', // Indiquem que esperem una resposta com a blob (fitxer)
        },
      );
      return response.data; // Retorna el fitxer en forma de Blob
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
