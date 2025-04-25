//src/app/services/consulta.service.ts
import {Injectable} from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import { AuthService } from './auth.service';
import {Consulta} from '../models/constulta.model';

@Injectable({
  providedIn: 'root'
})

export class ConsultaService {
  private API_URL = 'http://localhost:3000/api/consultes'; // Enllaç al backend

  constructor(private authService: AuthService) {}

  async getConsultes(): Promise<Consulta[]> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any[]> = await axios.get(this.API_URL, {
        headers: {
          Authorization: `Bearer ${token}` // Afegir el token a l'encapçalament
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error obtenint consultes:', error);
      return [];
    }
  }

  async generarPDF(consultaId: number): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<Blob> = await axios.get(`${this.API_URL}/generarPDF/${consultaId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Afegir el token a l'encapçalament
        },
        responseType: 'blob'  // Indiquem que esperem una resposta com a blob (fitxer)
      });
      return response.data; // Retorna el fitxer en forma de Blob
    } catch (error) {
      throw error;
    }
  }

}
