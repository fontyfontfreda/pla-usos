//src/app/services/adreca.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Adreca } from '../models/adreca.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
const ERR_TOKEN = 470;
@Injectable({
  providedIn: 'root',
})
export class AdrecaService {
  private API_URL = `${environment.apiUrl}/adreces`; // Enllaç al backend

  constructor(private authService: AuthService) {}

  async getAdreces(page: number = 1, limit: number = 25, search: string = ''): Promise<{ data: Adreca[]; total: number }> {
    try {
      const response: AxiosResponse<{ data: Adreca[]; total: number }> = await axios.get(this.API_URL, {
        params: { page, limit, q: search || undefined },
      });
      return response.data;
    } catch (error) {
      console.error('Error obtenint adreces:', error);
      return { data: [], total: 0 };
    }
  }

  async updateAdreca(adreca: Adreca) {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.put(
        this.API_URL + `/${adreca.DOMCOD}`,
        { adreca },
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
