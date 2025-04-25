import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConsultaService} from '../../../services/consulta.service';
import {Consulta} from '../../../models/constulta.model';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent implements OnInit {
  consultes: Consulta[] = [];
  selectedConsulta: Consulta | null = null;
  searchTerm: string = '';

  constructor(private constultaService: ConsultaService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadConsultes().then();
  }

  async loadConsultes() {
    try {
      this.consultes = await this.constultaService.getConsultes();
      console.log(this.consultes)
    } catch (error) {
      console.error('Error carregant les adreces', error);
    }
  }

  // Mètode per filtrar les consultes segons el terme de cerca
  filteredConsultes() {
    if (!this.searchTerm) {
      return this.consultes;
    }
    return this.consultes.filter(consulta =>
      consulta.dni_interessat.toLowerCase().includes(this.searchTerm.toLowerCase()) || // Busca per DNI INTERESSAT
      consulta.nom_interessat.toLowerCase().includes(this.searchTerm.toLowerCase())    // Busca per NOM INTERESSAT
    );
  }

  // Mètode per veure els detalls d'una consulta
  veureDetalls(consulta: Consulta) {
    this.selectedConsulta = { ...consulta };  // Copiar les dades de la consulta seleccionada
  }

  // Mètode per tancar el modal
  tancarModal() {
    this.selectedConsulta = null;
  }
}
