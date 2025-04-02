import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Adreca } from '../../../models/adreca.model';
import {MatDialog} from '@angular/material/dialog';
import {AdrecaService} from '../../../services/adreca.service';  // Importar el model Adreca

@Component({
  selector: 'app-adreca',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adreca.component.html',
  styleUrls: ['./adreca.component.css']
})
export class AdrecaComponent {

  // Llista d'adreces amb el model Adreca
  adreces: Adreca[] = [];

  searchTerm: string = '';
  selectedAdreca: Adreca | null = null;

  constructor(private adrecaService: AdrecaService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadAdreces().then();
  }

  async loadAdreces(){
    this.adreces = await this.adrecaService.getAdreces();
  }

  // Mètode per filtrar les adreces segons el terme de cerca
  filteredAdreces() {
    if (!this.searchTerm) {
      return this.adreces;
    }
    return this.adreces.filter(adreca =>
      adreca.DOMCOD.toString().includes(this.searchTerm) || // Busca per DOMCOD
      adreca.adreca.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Mètode per veure els detalls d'una adreça
  verDetalls(adreca: Adreca) {
    this.selectedAdreca = { ...adreca };  // Copiar les dades de l'adreça seleccionada
  }

  // Mètode per guardar els canvis d'una adreça
  guardarAdreca() {
    console.log('Adreça guardada:', this.selectedAdreca);
    this.tancarModal();
  }

  // Mètode per eliminar una adreça
  eliminarAdreca() {
    if (this.selectedAdreca) {
      const index = this.adreces.findIndex(a => a.DOMCOD === this.selectedAdreca!.DOMCOD);
      if (index > -1) {
        this.adreces.splice(index, 1);
        console.log('Adreça eliminada:', this.selectedAdreca);
        this.tancarModal();
      }
    }
  }

  // Mètode per tancar el modal
  tancarModal() {
    this.selectedAdreca = null;
  }
}
