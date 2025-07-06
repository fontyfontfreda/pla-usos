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

  async createEpigraf(dades: { id: number; codi1: number; codi2: number; codi3: number, descripcio: string, mostrar: boolean, CONDICIONS: any }) {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.post(
        this.API_URL,
        {dades: dades},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }}
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getEpigraf(epigraf: Epigraf): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any[]> = await axios.get(this.API_URL+'/'+epigraf.id,{
        headers: {
          Authorization: `Bearer ${token}` // Afegir el token a l'encapçalament
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error obtenint l\'epígraf: ' + epigraf.descripcio, error);
      return [];
    }
  }

  async updateCondicio(condicio: any): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.put(
        this.API_URL+`/condicio`,
        { condicio },
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

  async updateEpigraf(epigraf: Epigraf): Promise<any> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.put(
        this.API_URL+`/epigraf`,
        { epigraf },
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
