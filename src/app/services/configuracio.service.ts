//src/app/services/configuracio.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
const ERR_TOKEN = 470;
@Injectable({
  providedIn: 'root'
})
export class ConfiguracioService {
  private API_URL = `${environment.apiUrl}/configuracio`; // Enllaç al backend

  constructor(private authService: AuthService) {
  }

  async getLink(): Promise<string> {
    try {
      const response: AxiosResponse<string> = await axios.get(this.API_URL+"/link-pla-especial");
      return response.data;
    } catch (error) {
      console.error('Error obtenint l\'enllaç:', error);
      return "";
    }
  }

  async updateLink(link: string): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.put(
        this.API_URL+'/link-pla-especial',
        { link },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == ERR_TOKEN) {
          this.authService.logout();
        }
      } else {
      throw error;}
    }
  }
}
