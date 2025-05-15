import { Component, OnInit } from '@angular/core';
import { ActivitatService } from '../../../services/activitat.service';
import { MatDialog } from '@angular/material/dialog';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-activitat',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './activitat.component.html',
  styleUrl: './activitat.component.css'
})

export class ActivitatComponent implements OnInit {
  activitats: Record<string, Record<string, string[]>> = {};

  objectKeys = Object.keys;

  grupSeleccionat: string | null = null;
  subgrupSeleccionat: string | null = null;

  activitatSeleccionada: any | null = null;
  backupCondicions: Record<number, any> = {};

  novaActivitatMode: boolean = false;
  novaActivitat: any | null = null;

  grupsDisponibles: string[] = [];
  subgrupsDisponibles: string[] = [];

  codiGrup: boolean = true;
  codiSubgrup: boolean = true;

  constructor(private activitatService: ActivitatService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadActivitats();
  }

  async loadActivitats() {
    try {
      this.activitats = await this.activitatService.getAllActivitats();
      this.grupsDisponibles = Object.keys(this.activitats);

      console.log(this.activitats);
    } catch (error) {
      console.error('Error carregant les activitats', error);
    }
  }

  toggleGrup(grup: string) {
    this.grupSeleccionat = this.grupSeleccionat === grup ? null : grup;
    this.subgrupSeleccionat = null; // Reset subgrup quan canviem de grup
  }

  toggleSubgrup(subgrup: string) {
    this.subgrupSeleccionat = this.subgrupSeleccionat === subgrup ? null : subgrup;
  }

  async veureActivitat(activitat: string) {
    try {
      this.activitatSeleccionada = await this.activitatService.getActivitat(activitat);
      this.activitatSeleccionada.forEach((c: { editant: boolean; }) => c.editant = false);
      console.log(this.activitatSeleccionada);
    } catch (error) {
      console.error('Error carregant l\'activitat: ' + activitat, error);
    }
  }

  tancarModal() {
    this.activitatSeleccionada = null;
    this.novaActivitatMode = false;
    this.novaActivitat = null;
  }

  async guardarActivitat(condicio: any) {
    const condicioPlana = {
      ID: condicio.ID,
      CONDICIO_ID: condicio.CONDICIO_ID,
      VALOR: condicio.VALOR
      // afegeix aquí només les propietats que el backend necessita
    };

    try {
      await this.activitatService.updateCondicio(condicioPlana);
      alert('Condició actualitzada correctament.');
      condicio.editant = false;
    } catch (error) {
      console.error('Error actualitzant la condició:', error);
      alert('Error actualitzant la condició.');
    }
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

  onBackdropClick(event: MouseEvent): void {
    this.tancarModal();
  }

  editCondition(condicio: any){
    condicio.editant = true;
    this.backupCondicions[condicio.ID] = { ...condicio };
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

  async iniciarNovaActivitat() {
    const condicions = await this.carregarCondicionsInicials(); // per zones i àrees

    this.novaActivitatMode = true;
    this.novaActivitat = {
      CODI_GRUP: '',
      GRUP: '',
      CODI_SUBGRUP: '',
      SUBGRUP: '',
      CODI_ACTIVITAT: '',
      DESCRIPCIO: '',
      CONDICIONS: condicions.map(c => ({
        ...c,
        editant: true
      }))
    };
    this.activitatSeleccionada = this.novaActivitat.CONDICIONS;
  }

  async guardarNovaActivitat() {
    const dades = {
      GRUP: this.novaActivitat.GRUP,
      CODI_GRUP: this.novaActivitat.CODI_GRUP,
      SUBGRUP: this.novaActivitat.SUBGRUP,
      CODI_SUBGRUP: this.novaActivitat.CODI_SUBGRUP,
      DESCRIPCIO: this.novaActivitat.DESCRIPCIO,
      CODI_ACTIVITAT: this.novaActivitat.CODI_ACTIVITAT,
      CONDICIONS: this.activitatSeleccionada.map((c: any) => ({
        CODI: c.CODI,
        ID_ZONA: c.ID_ZONA,
        IS_ZONA: c.IS_ZONA,
        CONDICIO_ID: c.CONDICIO_ID,
        VALOR: c.VALOR
      }))
    };

    try {
      console.log(dades)
      await this.activitatService.createActivitat(dades);
      alert('Activitat creada correctament.');
      this.tancarModal();
      this.loadActivitats();
    } catch (error) {
      console.error('Error creant activitat:', error);
      alert('Error creant l\'activitat.');
    }
  }

  cancelarNovaActivitat() {
    this.tancarModal();
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

  onGrupSeleccionat(event: any) {
    let grup = event.target.value
    this.novaActivitat.GRUP = grup;
    this.subgrupsDisponibles = Object.keys(this.activitats[grup] || {});
    this.codiGrup = false;

    this.novaActivitat.SUBGRUP = '';

  }

  assignarSubgup(event: any) {
    this.novaActivitat.SUBGRUP = event.target.value;
    this.codiSubgrup = false;
  }

  protected readonly event = event;

}
