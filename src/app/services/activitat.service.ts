import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {Adreca} from '../models/adreca.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitatService {

  private API_URL = 'http://localhost:3000/api/activitats'; // Enllaç al backend

  async getActivitats(adreca: Adreca | null): Promise<any[]> {
    try {
      const response: AxiosResponse<any[]> = await axios.get(this.API_URL+'/'+adreca?.DOMCOD);
      return response.data;
    } catch (error) {
      console.error('Error obtenint adreces:', error);
      return [];
    }
  }

  async sendActivitat(dades: any): Promise<any> {
    try {
      const response: AxiosResponse<Blob> = await axios.post(`${this.API_URL}/consulta`, {
        dades: { dades }, // Enviem les dades al cos de la sol·licitud
      }, {
        responseType: 'blob'  // Indiquem que esperem una resposta com a blob (fitxer)
      });

      return response.data; // Retorna el fitxer en forma de Blob
    } catch (error) {
      throw error;
    }
  }

}
