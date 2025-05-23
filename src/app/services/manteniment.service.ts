import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, {AxiosResponse} from 'axios';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MantenimentService {
  private API_URL = `${environment.apiUrl}/health`; // Enllaç al backend

  constructor(private router: Router) { }

  async health(): Promise<any[]> {
    try {
      const response: AxiosResponse<any[]> = await axios.get(this.API_URL, {
      });
      return response.data;
    } catch (error) {
      await this.router.navigate(['/manteniment']);
      return [];
    }
  }
}
