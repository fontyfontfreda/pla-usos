import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NotificacioComponent} from '../../shared/notificacio/notificacio.component';
import {Epigraf} from '../../../models/epigraf.model';
import {EpigrafService} from '../../../services/epigraf.service';
import {ActivitatService} from '../../../services/activitat.service';

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

  nouEpigrafMode: boolean = false;
  nouEpigraf: any | null = null;

  epigrafSeleccionat: any | null = null;
  epigrafEdit: any | null = null;

  backupCondicions: Record<number, any> = {};


  textNoti: string = '';
  tipusNoti: 'error' | 'ok' | 'info' = 'info';

  constructor(private epigrafService: EpigrafService, private activitatService: ActivitatService, public dialog: MatDialog) {
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
      (Epigraf.codi1 + '.' + Epigraf.codi2 + '.' + Epigraf.codi3).toLowerCase().includes(this.searchTerm.toLowerCase()) // Busca per Codi d'epígraf
    );
  }

  // Mètode per veure els detalls d'un Epígraf
  veureDetalls(Epigraf: Epigraf) {
    this.selectedEpigraf = {...Epigraf};  // Copiar les dades de la Epigraf seleccionada
  }

  // Mètode per tancar el modal
  tancarModal() {
    this.epigrafSeleccionat = null;
    this.nouEpigrafMode = false;
    this.nouEpigraf = null;
    this.loadEpigrafs();
  }

  private timeOutNoti() {
    setTimeout(() => {
      this.textNoti = '';
    }, 2500);
  }

  async carregarCondicionsInicials() {
    const zones = await this.activitatService.getZones();
    const arees = await this.activitatService.getArees();

    return [
      ...zones.map((z: { CODI: string, ID: string }) => ({
        IS_ZONA: 1,
        ID_ZONA: z.ID,
        CODI: z.CODI,
        CONDICIO_ID: null,
        CONDICIO: '',
        VALOR: null
      })),
      ...arees.map((a: { CODI: string, ID: string }) => ({
        IS_ZONA: 0,
        ID_ZONA: a.ID,
        CODI: a.CODI,
        CONDICIO_ID: null,
        CONDICIO: '',
        VALOR: null
      }))
    ];

  }

  async iniciarNouEpigraf() {
    const condicions = await this.carregarCondicionsInicials(); // per zones i àrees

    this.nouEpigrafMode = true;
    this.nouEpigraf = {
      id: 0,
      codi: '',
      descripcio: '',
      mostrar: true,
      CONDICIONS: condicions.map(c => ({
        ...c,
        editant: true
      }))
    };
    this.epigrafSeleccionat = this.nouEpigraf.CONDICIONS;
  }

  onBackdropClick(event: MouseEvent): void {
    this.tancarModal();
  }

  onCondicioChange(condicio: any) {
    const opcions = {
      1: 'No apte',
      2: 'Apte',
      3: 'Apte prioritari',
      4: 'Distància 50m',
      5: 'Distància 100m',
      6: 'Densitat 50m',
      7: 'Amplaria carrer',
      8: 'Ubicacio ARE',
      9: 'Ubicacio parcel·la',
      10: 'Urbanistica',
      11: 'Dimensio'
    };

    // @ts-ignore
    condicio.CONDICIO = opcions[condicio.CONDICIO_ID] || '';
  }

  async guardarEpigraf(condicio: any) {
    const condicioPlana = {
      ID: condicio.ID,
      CONDICIO_ID: condicio.CONDICIO_ID,
      VALOR: condicio.VALOR
    };

    try {
      await this.epigrafService.updateCondicio(condicioPlana);
      this.textNoti = 'Condició actualitzada correctament.';
      this.tipusNoti = 'ok';
      this.timeOutNoti();
      condicio.editant = false;
    } catch (error) {
      this.textNoti = 'Error actualitzant la condició.';
      this.tipusNoti = 'error';
      this.timeOutNoti();
    }
  }

  cancelCondition(condicio: any) {
    const original = this.backupCondicions[condicio.ID];
    if (original) {
      condicio.CONDICIO_ID = original.CONDICIO_ID;
      condicio.CONDICIO = original.CONDICIO;
      condicio.VALOR = original.VALOR;
    }
    condicio.editant = false;
  }

  editCondition(condicio: any) {
    condicio.editant = true;
    this.backupCondicions[condicio.ID] = {...condicio};
  }

  async guardarNouEpigraf() {
    if (/^\d+\.\d+\.\d+$/.test(this.nouEpigraf.codi)) {
      const [codi1, codi2, codi3] = this.nouEpigraf.codi.split('.');
      const dades = {
        id: this.nouEpigraf.id,
        codi1: codi1,
        codi2: codi2,
        codi3: codi3,
        descripcio: this.nouEpigraf.descripcio,
        mostrar: this.nouEpigraf.mostrar,
        CONDICIONS: this.epigrafSeleccionat.map((c: any) => ({
          CODI: c.CODI,
          ID_ZONA: c.ID_ZONA,
          IS_ZONA: c.IS_ZONA,
          CONDICIO_ID: c.CONDICIO_ID,
          VALOR: c.VALOR
        }))
      };

      try {
        await this.epigrafService.createEpigraf(dades);
        this.textNoti = 'Epígraf creat correctament.';
        this.tipusNoti = 'ok';
        this.timeOutNoti();
        this.tancarModal();
        this.loadEpigrafs();
      } catch (error: any) {
        const missatgeError = error?.response?.data || 'Error desconegut';
        this.textNoti = 'Error creant l\'epígraf: ' + missatgeError;
        this.tipusNoti = 'error';
        this.timeOutNoti();
      }
    } else {
      this.textNoti = 'El codi ha de tenir el format x.x.x';
      this.tipusNoti = 'error';
      this.timeOutNoti();
    }
  }

  cancelarNouEpigraf() {
    this.tancarModal();
  }

  async editarEpigraf(epigraf: Epigraf) {
    try {
      this.epigrafEdit = await this.epigrafService.getEpigraf(epigraf);
      this.epigrafEdit.MOSTRAR = this.epigrafEdit.MOSTRAR == 1;
      this.epigrafSeleccionat = this.epigrafEdit.condicions;
      this.epigrafSeleccionat.forEach((c: { editant: boolean; }) => c.editant = false);
    } catch (error) {
      this.textNoti = 'Error carregant l\'epígraf: ' + epigraf.descripcio;
      this.tipusNoti = 'error';
      this.timeOutNoti();
    }
  }

  async onChangeEpigraf(event: Event, tipus: number) {
    const epigraf = new Epigraf(this.epigrafEdit.ID, this.epigrafEdit.CODI1, this.epigrafEdit.CODI2, this.epigrafEdit.CODI3, this.epigrafEdit.DESCRIPCIO, !this.epigrafEdit.MOSTRAR)
    if (tipus == 1) {
      const valor = (event.target as HTMLInputElement).value;
      epigraf.descripcio = valor;
    }
    try {
      await this.epigrafService.updateEpigraf(epigraf);
      this.textNoti = 'Epígraf actualitzat correctament.';
      this.tipusNoti = 'ok';
      this.timeOutNoti();
    } catch (error) {
      this.textNoti = 'Error carregant l\'epígraf: ' + epigraf.descripcio;
      this.tipusNoti = 'error';
      this.timeOutNoti();
    }
  }
}
