import {Component, OnInit} from '@angular/core';
import {ActivitatService} from '../../../services/activitat.service';
import {MatDialog} from '@angular/material/dialog';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NotificacioComponent} from '../../shared/notificacio/notificacio.component';
import {EpigrafService} from '../../../services/epigraf.service';
import {Epigraf} from '../../../models/epigraf.model';

@Component({
  selector: 'app-activitat',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    NotificacioComponent
  ],
  templateUrl: './activitat.component.html',
  styleUrl: './activitat.component.css'
})

export class ActivitatComponent implements OnInit {
  rolUsuari: string | null = null;
  activitats: Record<string, Record<string, string[]>> = {};

  objectKeys = Object.keys;

  grupSeleccionat: string | null = null;
  subgrupSeleccionat: string | null = null;

  activitatSeleccionada: any | null = null;
  subgrupEditar: any | null = null;
  grupEditar: any | null = null;

  creant: boolean = false;

  // @ts-ignore
  editing: 1 | 2 | 3 = 1;

  epigrafsDisponibles: Epigraf[] = [];
  epigrafSeleccionat: string = '';

  grupsDisponibles: string[] = [];
  subgrupsDisponibles: string[] = [];

  grupDisponible: string | null = null;
  subgrupDisponible: string | null = null;

  textNoti: string = '';
  tipusNoti: 'error' | 'ok' | 'info' = 'info';

  constructor(private activitatService: ActivitatService, private epigrafService: EpigrafService, public dialog: MatDialog) {
    this.rolUsuari = localStorage.getItem('rol_usuari');
  }

  ngOnInit(): void {
    this.loadActivitats();
  }

  async loadActivitats() {
    try {
      this.activitats = await this.activitatService.getAllActivitats();
      this.epigrafsDisponibles = await this.epigrafService.getEpigrafs();
    } catch (error) {
      this.textNoti = 'Error carregant les activitats';
      this.tipusNoti = 'error';
      this.timeOutNoti();
    }
  }

  toggleGrup(grup: string) {
    this.grupSeleccionat = this.grupSeleccionat === grup ? null : grup;
    this.subgrupSeleccionat = null; // Reset subgrup quan canviem de grup
  }

  toggleSubgrup(subgrup: string) {
    this.subgrupSeleccionat = this.subgrupSeleccionat === subgrup ? null : subgrup;
  }

  async veureActivitat(activitat: string, subgrup: string, grup: string) {
    if (this.rolUsuari && this.rolUsuari < '3'){
      try {
        this.activitatSeleccionada = await this.activitatService.getActivitat(activitat, subgrup, grup);
        this.epigrafSeleccionat = this.activitatSeleccionada.id_epigraf;
        this.editing = 3;
      } catch (error) {
        this.textNoti = 'Error carregant l\'activitat: ' + activitat;
        this.tipusNoti = 'error';
        this.timeOutNoti();
      }
    }
  }

  async veureSubgrup(subgrup: string, grup: string) {
    try {
      this.subgrupEditar = await this.activitatService.getSubgrup(subgrup, grup);
      this.editing = 2;
    } catch (error) {
      this.textNoti = 'Error carregant el subgrup: ' + subgrup;
      this.tipusNoti = 'error';
      this.timeOutNoti();
    }
  }

  async veureGrup(grup: string) {
    try {
      this.grupEditar = await this.activitatService.getGrup(grup);
      this.editing = 1;
    } catch (error) {
      this.textNoti = 'Error carregant el grup: ' + grup;
      this.tipusNoti = 'error';
      this.timeOutNoti();
    }
  }

  tancarModal() {
    this.activitatSeleccionada = null;
    this.subgrupEditar = null;
    this.grupEditar = null;
    this.creant = false;
    this.epigrafSeleccionat = '';
    this.subgrupDisponible = '';
    this.grupDisponible = '';
    this.loadActivitats();
  }

  async guardarActivitat() {
    if (!this.creant) {
      if (this.editing == 1) {
        this.grupEditar.editing = this.editing;
      } else if (this.editing == 2) {
        this.subgrupEditar.editing = this.editing;
      } else if (this.editing == 3) {
        this.activitatSeleccionada.id_epigraf = this.epigrafSeleccionat;
        this.activitatSeleccionada.editing = this.editing;
      }
      try {
        if (this.editing == 1) {
          await this.activitatService.updateActivitat(this.grupEditar);
          this.textNoti = 'Grup actualitzat correctament.';
        } else if (this.editing == 2) {
          await this.activitatService.updateActivitat(this.subgrupEditar);
          this.textNoti = 'Subgrup actualitzat correctament.';
        } else if (this.editing == 3) {
          await this.activitatService.updateActivitat(this.activitatSeleccionada);
          this.textNoti = 'Activitat actualitzada correctament.';
        }
        this.tipusNoti = 'ok';
        this.timeOutNoti();
        this.tancarModal();
      } catch (error) {
        if (this.editing == 1)
          this.textNoti = 'Error actualitzant el grup: ' + this.subgrupEditar.descripcio_subgrup;
        else if (this.editing == 2)
          this.textNoti = 'Error actualitzant el subgrup: ' + this.subgrupEditar.descripcio_subgrup;
        else if (this.editing == 3)
          this.textNoti = 'Error actualitzant l\'activitat: ' + this.activitatSeleccionada.descripcio_activitat;
        this.tipusNoti = 'error';
        this.timeOutNoti();
      }
    } else {
      try {
        if (this.editing == 1) {
          await this.activitatService.createGrup(this.grupEditar);
          this.textNoti = 'Grup creat correctament.';
        } else if (this.editing == 2) {
          await this.activitatService.createSubgrup(this.subgrupEditar, this.epigrafSeleccionat);
          this.textNoti = 'Subgrup actualitzat correctament.';
        } else if (this.editing == 3) {
          let activitat = {
            grup: this.grupDisponible,
            subgrup: this.subgrupDisponible,
            epigraf: this.epigrafSeleccionat,
            activitat: this.activitatSeleccionada
          }
          await this.activitatService.createActivitat(activitat);
          this.textNoti = 'Activitat actualitzada correctament.';
        }
        this.tipusNoti = 'ok';
        this.timeOutNoti();
        this.tancarModal();
      } catch (error: any) {
        const missatgeError = error?.response?.data || 'Error desconegut';
        if (this.editing == 1)
          this.textNoti = 'Error creant el grup: ' + missatgeError;
        else if (this.editing == 2)
          this.textNoti = 'Error creant el subgrup: ' + missatgeError;
        else if (this.editing == 3)
          this.textNoti = 'Error creant l\'activitat: ' + missatgeError;
        this.tipusNoti = 'error';
        this.timeOutNoti();
      }
    }
  }

  onBackdropClick(event: MouseEvent): void {
    this.tancarModal();
  }

  timeOutNoti() {
    setTimeout(() => {
      this.textNoti = '';
    }, 2500);
  }

  protected readonly event = event;

  canviEpigraf(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
  }

  iniciarNouGrup() {
    this.editing = 1;
    this.creant = true;
    this.grupEditar = {
      descripcio_grup: ""
    }
  }

  iniciarNouSubgrup() {
    this.grupsDisponibles = Object.keys(this.activitats);

    this.creant = true;
    this.editing = 2;
    this.creant = true;
    this.subgrupEditar = {
      descripcio_subgrup: ""
    }
  }

  iniciarNovaActivitat() {
    this.grupsDisponibles = Object.keys(this.activitats);

    this.creant = true;
    this.editing = 3;
    this.creant = true;
    this.activitatSeleccionada = {
      descripcio_activitat: "",
      mostrar: true,
    }
  }

  canviGrup(event: Event): void {
    const grup = this.grupDisponible;

    // Comprovem si existeix el grup
    if (grup && this.activitats[grup]) {
      this.subgrupsDisponibles = Object.keys(this.activitats[grup]);
    } else {
      this.subgrupsDisponibles = [];
    }

    // Reiniciar la selecció de subgrup si canviem de grup
    this.subgrupDisponible = '';
  }
}
