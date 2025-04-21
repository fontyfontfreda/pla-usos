import { Component } from '@angular/core';
import {Usuari} from '../../../models/usuari.model';
import {UsuariService} from '../../../services/usuari.service';
import {MatDialog} from '@angular/material/dialog';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-usuari',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
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
      console.error('Error carregant les adreces', error);
    } finally {
      this.isLoading = false; // Desactiva el loader quan acaba
    }
  }

  guardarUsuari() {
    if (!this.nouUsuari.usuari || !this.nouUsuari.contrasenya) {
      alert('Cal omplir tots els camps!');
      return;
    }

    this.usuariService.addUsuari(this.nouUsuari)
      .then(response => {
        console.log('✅ Usuari creat correctament:', response);
        alert('Usuari creat correctament!');
        this.usuariDialog = false;
        this.nouUsuari = new Usuari('', '');
        this.loadUsuaris(); // Tornar a carregar la taula d'usuaris (si tens aquesta funció)
      })
      .catch(error => {
        console.error('❌ Error creant usuari:', error);
        alert('Error creant l\'usuari');
      });
  }

  obrirCanviContrasenya(usuari: any) {
    this.usuariSeleccionat = usuari;
    this.novaContrasenya = '';
    this.canviContrasenyaDialog = true;
  }

  guardarNovaContrasenya() {
    if (!this.novaContrasenya) {
      alert('Cal introduir una nova contrasenya.');
      return;
    }

    // Aquí hauries de cridar al teu servei per actualitzar la contrasenya
    this.usuariService.updateContrasenya(this.usuariSeleccionat.usuari, this.novaContrasenya)
      .then(response => {
        alert('Contrasenya actualitzada correctament.');
        this.canviContrasenyaDialog = false;
      })
      .catch(error => {
        console.error('Error actualitzant contrasenya:', error);
        alert('Error actualitzant la contrasenya.');
      });
  }

  esborrarUsuari(usuari: any) {
    if (confirm(`Estàs segur que vols esborrar l'usuari ${usuari.usuari}?`)) {
      this.usuariService.deleteUsuari(usuari.usuari)
        .then(response => {
          alert('Usuari esborrat correctament.');
          this.loadUsuaris(); // Torna a carregar la taula
        })
        .catch(error => {
          console.error('Error esborrant usuari:', error);
          alert('Error esborrant l\'usuari.');
        });
    }
  }
}
