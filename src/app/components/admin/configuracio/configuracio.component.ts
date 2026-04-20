import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfiguracioService } from '../../../services/configuracio.service';
import { Consulta } from '../../../models/consulta.model';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificacioComponent } from '../../shared/notificacio/notificacio.component';

@Component({
  selector: 'app-configuracio',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    NotificacioComponent,
  ],
  templateUrl: './configuracio.component.html',
  styleUrl: './configuracio.component.css',
})
export class ConfiguracioComponent implements OnInit {
  link: string = '';
  nouLink: string = '';

  paramDialog: boolean = false;

  textNoti: string = '';
  tipusNoti: 'error' | 'ok' | 'info' = 'info';

  constructor(private configuracioService: ConfiguracioService) {}

  ngOnInit(): void {
    this.loadConfiguracio().then();
  }

  async loadConfiguracio() {
    try {
      this.link = await this.configuracioService.getLink();
    } catch (error) {
      this.textNoti = 'Error carregant les consultes';
      this.tipusNoti = 'error';
      this.timeOutNoti();
    }
  }

  obrirCanviLink() {
    this.paramDialog = true;
  }

  guardarParam() {
    if (!this.nouLink) {
      this.textNoti = 'Cal omplir el camp enllaç!';
      this.tipusNoti = 'info';
      this.timeOutNoti();
      return;
    }

    this.configuracioService
      .updateLink(this.nouLink)
      .then((response) => {
        this.textNoti = 'Enllaç actualitzat correctament!';
        this.tipusNoti = 'ok';
        this.timeOutNoti();
        this.paramDialog = false;
        this.loadConfiguracio(); // Tornar a carregar la taula d'usuaris (si tens aquesta funció)
      })
      .catch((error) => {
        this.textNoti = 'Error creant usuari: ' + error;
        this.tipusNoti = 'error';
        this.timeOutNoti();
      });
  }

  private timeOutNoti() {
    setTimeout(() => {
      this.textNoti = '';
    }, 2500);
  }
}
