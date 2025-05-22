import { Component } from '@angular/core';
import {Usuari} from '../../../models/usuari.model';
import {UsuariService} from '../../../services/usuari.service';
import {MatDialog} from '@angular/material/dialog';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotificacioComponent} from '../../shared/notificacio/notificacio.component';


@Component({
  selector: 'app-usuari',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NotificacioComponent
  ],
  templateUrl: './usuari.component.html',
  styleUrl: './usuari.component.css'
})
export class UsuariComponent {
  isLoading: boolean = false;
  // Llista d'usuaris amb el model Usuari
  usuaris: Usuari[] = [];

  usuariDialog = false;
  nouUsuari: Usuari = new Usuari('', '');

  usuariSeleccionat: any = null;
  novaContrasenya: string = '';
  canviContrasenyaDialog: boolean = false;

  textNoti: string = '';
  tipusNoti: 'error' | 'ok' | 'info' = 'info';

  constructor(private usuariService: UsuariService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadUsuaris().then();
  }

  async loadUsuaris() {
    this.isLoading = true; // Activa el loader
    try {
      this.usuaris = await this.usuariService.getUsuaris();
    } catch (error) {
      this.textNoti = 'Error carregant els usuaris:' + error;
      this.tipusNoti = 'error';
      this.timeOutNoti();
    } finally {
      this.isLoading = false; // Desactiva el loader quan acaba
    }
  }

  guardarUsuari() {
    if (!this.nouUsuari.usuari || !this.nouUsuari.contrasenya) {
      this.textNoti = 'Cal omplir tots els camps!';
      this.tipusNoti = 'info';
      this.timeOutNoti();
      return;
    }

    this.usuariService.addUsuari(this.nouUsuari)
      .then(response => {
        this.textNoti = 'Usuari creat correctament!';
        this.tipusNoti = 'ok';
        this.timeOutNoti();
        this.usuariDialog = false;
        this.nouUsuari = new Usuari('', '');
        this.loadUsuaris(); // Tornar a carregar la taula d'usuaris (si tens aquesta funció)
      })
      .catch(error => {
        this.textNoti = 'Error creant usuari: '+ error;
        this.tipusNoti = 'error';
        this.timeOutNoti();
      });
  }

  obrirCanviContrasenya(usuari: any) {
    this.usuariSeleccionat = usuari;
    this.novaContrasenya = '';
    this.canviContrasenyaDialog = true;
  }

  guardarNovaContrasenya() {
    if (!this.novaContrasenya) {
      this.textNoti = 'Cal introduir una nova contrasenya.';
      this.tipusNoti = 'info';
      this.timeOutNoti();
      return;
    }

    // servei per actualitzar la contrasenya
    this.usuariService.updateContrasenya(this.usuariSeleccionat.usuari, this.novaContrasenya)
      .then(response => {
        this.textNoti = 'Contrasenya actualitzada correctament.';
        this.tipusNoti = 'ok';
        this.timeOutNoti();
        this.canviContrasenyaDialog = false;
      })
      .catch(error => {
        this.textNoti = 'Error actualitzant la contrasenya: ' + error;
        this.tipusNoti = 'error';
        this.timeOutNoti();
      });
  }

  esborrarUsuari(usuari: any) {
    if (confirm(`Estàs segur que vols esborrar l'usuari ${usuari.usuari}?`)) {
      this.usuariService.deleteUsuari(usuari.usuari)
        .then(response => {
          this.textNoti = 'Usuari esborrat correctament.';
          this.tipusNoti = 'ok';
          this.timeOutNoti();
          alert('Usuari esborrat correctament.');
          this.loadUsuaris(); // Torna a carregar la taula
        })
        .catch(error => {
          this.textNoti = 'Error esborrant usuari: ' + error;
          this.tipusNoti = 'error';
          this.timeOutNoti();
        });
    }
  }

  private timeOutNoti() {
    setTimeout(() => {
      this.textNoti = '';
    }, 2500);
  }
}
