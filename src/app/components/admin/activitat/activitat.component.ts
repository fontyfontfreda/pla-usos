import { Component, OnInit } from '@angular/core';
import { ActivitatService } from '../../../services/activitat.service';
import { MatDialog } from '@angular/material/dialog';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-activitat',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './activitat.component.html',
  styleUrl: './activitat.component.css'
})
export class ActivitatComponent implements OnInit {
  activitats: Record<string, Record<string, string[]>> = {};

  objectKeys = Object.keys;

  constructor(private activitatService: ActivitatService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadConsultes();
  }

  async loadConsultes() {
    try {
      this.activitats = await this.activitatService.getAllActivitats();
      console.log(this.activitats);
    } catch (error) {
      console.error('Error carregant les activitats', error);
    }
  }
}
