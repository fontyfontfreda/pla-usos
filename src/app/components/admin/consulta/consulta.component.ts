import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConsultaService} from '../../../services/consulta.service';
import {Consulta} from '../../../models/constulta.model';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent implements OnInit {
  consultes: Consulta[] = [];
  selectedConsulta: Consulta | null = null;
  searchTerm: string = '';

  generantPDF: boolean = false;

  constructor(private consultaService: ConsultaService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadConsultes().then();
  }

  async loadConsultes() {
    try {
      this.consultes = await this.consultaService.getConsultes();
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

  // Mètode per geenrar l'informe
  generarPDF(consulta: Consulta) {
    this.generantPDF = true;
    this.consultaService.generarPDF(consulta.id)
      .then(response => {
        this.generantPDF = false;
        // Crear un URL per al fitxer blob rebut
        const fileURL = URL.createObjectURL(response);

        // Crear un enllaç per la descàrrega del fitxer
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = 'informe_final.pdf';  // Nom del fitxer a descarregar
        document.body.appendChild(a);
        a.click();  // Simula el clic per descarregar-lo
        document.body.removeChild(a);

      })
      .catch(error => {
        console.error("Error a l'enviar les dades:", error);
      });
  }

  // Mètode per tancar el modal
  tancarModal() {
    this.selectedConsulta = null;
  }
}
