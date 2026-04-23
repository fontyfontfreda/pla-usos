import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service'; // Importar el servei AuthService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() canviComonent = new EventEmitter<number>(); // Emissor d'esdeveniments per al sidebar

  username: string | null = "";

  constructor(private authService: AuthService) {
    this.username = localStorage.getItem('nom_usuari');
  } // Injectar AuthService

  toggleSidebar(page: number) {   
    this.canviComonent.emit(page);
  }

  // Mètode per fer logout
  logout() {
    this.authService.logout();
  }
}
