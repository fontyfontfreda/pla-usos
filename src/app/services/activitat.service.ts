import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {Adreca} from '../models/adreca.model';
import {Activitat} from '../models/activitat.model';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivitatService {

  private API_URL = `${environment.apiUrl}/activitats`; // Enllaç al backend

  constructor(private authService: AuthService) {}

  async getActivitats(adreca: Adreca | null): Promise<any[]> {
    try {
      const response: AxiosResponse<any[]> = await axios.get(this.API_URL+'/'+adreca?.DOMCOD);
      return response.data;
    } catch (error) {
      console.error('Error obtenint activitats:', error);
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

  async getAllActivitats(): Promise<Record<string, Record<string, string[]>>> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<Record<string, Record<string, string[]>>> = await axios.get(this.API_URL, {
        headers: {
          Authorization: `Bearer ${token}` // Afegir el token a l'encapçalament
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error obtenint activitats:', error);
      return {};
    }
  }

  async getActivitat(activitat: string): Promise<any[]> {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any[]> = await axios.get(this.API_URL+'/activitat/'+activitat,{
        headers: {
          Authorization: `Bearer ${token}` // Afegir el token a l'encapçalament
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error obtenint activitat: ' + activitat, error);
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

  async getZones() {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.put(
        this.API_URL+`/zones`,
        {},
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

  async getArees() {
    try {
      const token = this.authService.getToken();
      const response: AxiosResponse<any> = await axios.put(
        this.API_URL+`/arees`,
        {},
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

  async createActivitat(dades: { SUBGRUP: string; GRUP: string; CONDICIONS: any; DESCRIPCIO: string }) {
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
}
