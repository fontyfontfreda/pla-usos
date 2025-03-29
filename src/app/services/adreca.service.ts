//src/app/services/adreca.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AdrecaService {
  private API_URL = 'http://localhost:3000/api/adreces'; // Enllaç al backend

  async getAdreces(): Promise<any[]> {
    try {
      const response: AxiosResponse<any[]> = await axios.get(this.API_URL);
      return response.data;
    } catch (error) {
      console.error('Error obtenint adreces:', error);
      return [];
    }
  }
}
