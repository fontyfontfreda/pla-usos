import { Component, OnInit } from '@angular/core';
import { ActivitatService } from '../../../services/activitat.service';
import { MatDialog } from '@angular/material/dialog';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-activitat',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './activitat.component.html',
  styleUrl: './activitat.component.css'
})
export class ActivitatComponent implements OnInit {
  activitats: Record<string, Record<string, string[]>> = {};

  objectKeys = Object.keys;

  grupSeleccionat: string | null = null;
  subgrupSeleccionat: string | null = null;

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
}
