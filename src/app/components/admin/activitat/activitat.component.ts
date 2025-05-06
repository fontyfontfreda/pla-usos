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


  constructor(private activitatService: ActivitatService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadActivitats();
  }

  async loadActivitats() {
    try {
      this.activitats = await this.activitatService.getAllActivitats();
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
}
