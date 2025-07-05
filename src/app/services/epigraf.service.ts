//src/app/services/epigraf.service.ts
import {Injectable} from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import { AuthService } from './auth.service';
import {Epigraf} from '../models/epigraf.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EpigrafService {
  private API_URL = `${environment.apiUrl}/epigrafs`; // Enllaç al backend

  constructor(private authService: AuthService) {}

  async getEpigrafs(): Promise<Epigraf[]> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any[]> = await axios.get(this.API_URL, {
        headers: {
          Authorization: `Bearer ${token}` // Afegir el token a l'encapçalament
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error obtenint epígrafs:', error);
      return [];
    }
  }
}
