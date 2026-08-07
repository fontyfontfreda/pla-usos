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

  rolUsuari: string | null = null;

  isLoading: boolean = false;
  // Llista d'adreces amb el model Adreca (només la pàgina actual)
  adreces: Adreca[] = [];

  searchTerm: string = '';
  private searchDebounceId: any = null;

  pageSize: number = 25;
  currentPage: number = 1;
  totalItems: number = 0;

  selectedAdreca: Adreca | null = null;
  editantAdreca: any = null;

  textNoti: string = '';
  tipusNoti: 'error' | 'ok' | 'info' = 'info';

  constructor(private adrecaService: AdrecaService, public dialog: MatDialog) {
    this.rolUsuari = localStorage.getItem('rol_usuari');
  }

  ngOnInit(): void {
    this.loadAdreces().then();
  }

  get totalPages(): number {
    return Math.max(Math.ceil(this.totalItems / this.pageSize), 1);
  }

  async loadAdreces() {
    this.isLoading = true; // Activa el loader
    try {
      const { data, total } = await this.adrecaService.getAdreces(this.currentPage, this.pageSize, this.searchTerm);
      this.adreces = data;
      this.totalItems = total;
    } catch (error) {
      this.textNoti = 'Error carregant les adreces';
      this.tipusNoti = 'error';
      this.timeOutNoti();
    } finally {
      this.isLoading = false; // Desactiva el loader quan acaba
    }
  }

  // Es crida en cada tecla de l'input de cerca; espera que l'usuari deixi d'escriure abans de consultar el backend
  onSearchChange() {
    if (this.searchDebounceId) {
      clearTimeout(this.searchDebounceId);
    }
    this.searchDebounceId = setTimeout(() => {
      this.currentPage = 1;
      this.loadAdreces();
    }, 400);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.loadAdreces();
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
