import { Component } from '@angular/core';
import {Usuari} from '../../../models/usuari.model';
import {UsuariService} from '../../../services/usuari.service';
import {MatDialog} from '@angular/material/dialog';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-usuari',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './usuari.component.html',
  styleUrl: './usuari.component.css'
})
export class UsuariComponent {
  isLoading: boolean = false;
  // Llista d'usuaris amb el model Usuari
  usuaris: Usuari[] = [];

  constructor(private usuariService: UsuariService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadUsuaris().then();
  }

  async loadUsuaris() {
    this.isLoading = true; // Activa el loader
    try {
      this.usuaris = await this.usuariService.getUsuaris();
    } catch (error) {
      console.error('Error carregant les adreces', error);
    } finally {
      this.isLoading = false; // Desactiva el loader quan acaba
    }
  }
}
