//src/app/services/configuracio.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';

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
}
