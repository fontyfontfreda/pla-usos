import { Component, OnInit } from '@angular/core';
import { EpigrafService } from '../../../services/epigraf.service';
import { MatDialog } from '@angular/material/dialog';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NotificacioComponent} from '../../shared/notificacio/notificacio.component';
import {Epigraf} from '../../../models/epigraf.model';

@Component({
  selector: 'app-epigraf',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    NotificacioComponent
  ],
  templateUrl: './epigraf.component.html',
  styleUrl: './epigraf.component.css'
})

export class EpigrafComponent implements OnInit {
  epigrafs: Epigraf[] = [];
  selectedEpigraf: Epigraf | null = null;
  searchTerm: string = '';

  generantPDF: boolean = false;

  textNoti: string = '';
  tipusNoti: 'error' | 'ok' | 'info' = 'info';

  constructor(private epigrafService: EpigrafService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadEpigrafs().then();
  }

  async loadEpigrafs() {
    try {
      this.epigrafs = await this.epigrafService.getEpigrafs();
      for (const epigraf of this.epigrafs) {
      }
    } catch (error) {
      this.textNoti = 'Error carregant els epígrafs';
      this.tipusNoti = 'error';
      this.timeOutNoti();
    }
  }

  // Mètode per filtrar els epígrafs segons el terme de cerca
  filteredEpigrafs() {
    if (!this.searchTerm) {
      return this.epigrafs;
    }
    return this.epigrafs.filter(Epigraf =>
      Epigraf.descripcio.toLowerCase().includes(this.searchTerm.toLowerCase()) || // Busca per Descripcio
      (Epigraf.codi1+'.'+Epigraf.codi2+'.'+Epigraf.codi3).toLowerCase().includes(this.searchTerm.toLowerCase()) // Busca per Codi d'epígraf
    );
  }

  // Mètode per veure els detalls d'un Epígraf
  veureDetalls(Epigraf: Epigraf) {
    this.selectedEpigraf = { ...Epigraf };  // Copiar les dades de la Epigraf seleccionada
  }

  // Mètode per tancar el modal
  tancarModal() {
    this.selectedEpigraf = null;
  }

  private timeOutNoti() {
    setTimeout(() => {
      this.textNoti = '';
    }, 2500);
  }

}
