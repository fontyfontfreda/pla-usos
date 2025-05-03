//src/app/services/adreca.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import {Adreca} from '../models/adreca.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdrecaService {
  private API_URL = 'http://localhost:3000/api/adreces'; // Enllaç al backend

  constructor(private authService: AuthService) {
  }

  async getAdreces(): Promise<any[]> {
    try {
      const response: AxiosResponse<any[]> = await axios.get(this.API_URL);
      return response.data;
    } catch (error) {
      console.error('Error obtenint adreces:', error);
      return [];
    }
  }

  async updateAdreca(adreca: Adreca) {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.put(
        this.API_URL+`/${adreca.DOMCOD}`,
        { adreca },
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
