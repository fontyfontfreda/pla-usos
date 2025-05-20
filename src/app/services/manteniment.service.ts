import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, {AxiosResponse} from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MantenimentService {
  private API_URL = 'http://localhost:3000/api/health'; // Enllaç al backend

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
