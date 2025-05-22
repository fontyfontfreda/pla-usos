import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Adreca} from '../../../models/adreca.model';
import {MatDialog} from '@angular/material/dialog';
import {AdrecaService} from '../../../services/adreca.service';  // Importar el model Adreca
import {NotificacioComponent} from '../../shared/notificacio/notificacio.component';

@Component({
  selector: 'app-adreca',
  standalone: true,
  imports: [FormsModule, CommonModule, NotificacioComponent],
  templateUrl: './adreca.component.html',
  styleUrls: ['./adreca.component.css']
})


export class AdrecaComponent implements OnInit {
  tipusDomOptions: string[] = [
    'ADREÇA POSTAL',
    'TRIBUTARI',
    'FINCA',
    'ALTRES',
    'Via Pública'
  ];

  tipusLocOptions: string[] = [
    'DOMICILI FAMILIAR',
    'DOMICILI INHABITABLE',
    'SEGONA RESIDÈNCIA',
    'DOMICILI FAMILIAR TAPIAT',
    'DOMICILI COL·LECTIU',
    'LOCAL',
    'FINCA',
    'DOMICILI EN CONSTRUCCIÓ',
    'DOMICILI TURISTIC',
    'LOCAL EN CONSTRUCCIÓ',
    'TRASTER',
    'GARATGE',
    'TRANSFORMADOR',
    'VIA PÚBLICA'
  ];

  isLoading: boolean = false;
  // Llista d'adreces amb el model Adreca
  adreces: Adreca[] = [];

  searchTerm: string = '';
  selectedAdreca: Adreca | null = null;
  editantAdreca: any = null;

  textNoti: string = '';
  tipusNoti: 'error' | 'ok' | 'info' = 'info';

  constructor(private adrecaService: AdrecaService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadAdreces().then();
  }

  async loadAdreces() {
    this.isLoading = true; // Activa el loader
    try {
      this.adreces = await this.adrecaService.getAdreces();
    } catch (error) {
      this.textNoti = 'Error carregant les adreces';
      this.tipusNoti = 'error';
      this.timeOutNoti();
    } finally {
      this.isLoading = false; // Desactiva el loader quan acaba
    }
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
  veureDetalls(adreca: Adreca) {
    this.selectedAdreca = {...adreca};  // Copiar les dades de l'adreça seleccionada
  }

  // Mètode per tancar el modal
  tancarModal() {
    this.selectedAdreca = null;
    this.editantAdreca = null;
  }

  editarAdreca(adreca: any) {
    this.editantAdreca = { ...adreca }; // clonem per evitar mutació directa
  }

  onImatgeSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.editantAdreca.imatge = reader.result as string;
      };

      reader.readAsDataURL(file); // converteix la imatge a base64
    }
  }

  guardarCanvis() {
    // Aquí pots fer una crida a un servei si cal persistir dades
    const index = this.adreces.findIndex(a => a.DOMCOD === this.editantAdreca.DOMCOD);
    if (index > -1) {
      this.adreces[index] = { ...this.editantAdreca };
      this.adrecaService.updateAdreca(this.editantAdreca)
        .then(response => {
          this.textNoti = 'Adreça actualitzada correctament.';
          this.tipusNoti = 'ok';
          this.timeOutNoti();
        })
        .catch(error => {
          this.textNoti = 'Error actualitzant l\'adreça.';
          this.tipusNoti = 'error';
          this.timeOutNoti();
        });
    }
    this.tancarModal();
  }

  timeOutNoti() {
    setTimeout(() => {
      this.textNoti = '';
    }, 2500);
  }
}
