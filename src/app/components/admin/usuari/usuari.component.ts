import { Component } from '@angular/core';
import { Usuari } from '../../../models/usuari.model';
import { Rol } from '../../../models/rol.model';
import { UsuariService } from '../../../services/usuari.service';
import { MatDialog } from '@angular/material/dialog';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificacioComponent } from '../../shared/notificacio/notificacio.component';

@Component({
  selector: 'app-usuari',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NotificacioComponent,
  ],
  templateUrl: './usuari.component.html',
  styleUrl: './usuari.component.css',
})
export class UsuariComponent {
  isLoading: boolean = false;
  // Llista d'usuaris amb el model Usuari
  usuaris: Usuari[] = [];

  usuariDialog = false;
  nouUsuari: Usuari = new Usuari('', '', 0);

  usuariSeleccionat: any = null;
  novaContrasenya: string = '';
  modificacioUsuariDialog: boolean = false;

  rols: Rol[] = [];
  selectedRol: number = 0;

  textNoti: string = '';
  tipusNoti: 'error' | 'ok' | 'info' = 'info';

  constructor(
    private usuariService: UsuariService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadUsuaris().then();
    this.loadRols().then();
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

  async loadRols() {
    this.isLoading = true; // Activa el loader
    try {
      this.rols = await this.usuariService.getRols();
      this.selectedRol = this.rols[0].codi;
    } catch (error) {
      this.textNoti = 'Error carregant els rols:' + error;
      this.tipusNoti = 'error';
      this.timeOutNoti();
    } finally {
      this.isLoading = false; // Desactiva el loader quan acaba
    }
  }

  onRolChange() {
    console.log(this.selectedRol);
  }

  guardarUsuari() {
    if (!this.nouUsuari.usuari || !this.nouUsuari.contrasenya) {
      this.textNoti = 'Cal omplir tots els camps!';
      this.tipusNoti = 'info';
      this.timeOutNoti();
      return;
    }
    let rol = this.rols.find(r => r.codi === this.selectedRol)
    if (rol){
      this.nouUsuari.rol = rol.codi;
    }

    this.usuariService
      .addUsuari(this.nouUsuari)
      .then((response) => {
        this.textNoti = 'Usuari creat correctament!';
        this.tipusNoti = 'ok';
        this.timeOutNoti();
        this.usuariDialog = false;
        this.nouUsuari = new Usuari('', '', 0);
        this.loadUsuaris(); // Tornar a carregar la taula d'usuaris (si tens aquesta funció)
      })
      .catch((error) => {
        this.textNoti = 'Error creant usuari: ' + error;
        this.tipusNoti = 'error';
        this.timeOutNoti();
      });
  }

  obrirCanviContrasenya(usuari: any) {
    this.usuariSeleccionat = usuari;
    this.novaContrasenya = '';
    let rol = this.rols.find(r => r.codi === usuari.rol);
    if (rol) {
      this.selectedRol = rol.codi;
    }
    this.modificacioUsuariDialog = true;
  }

  actualitzarUsuari() {
    if (this.novaContrasenya) {
      // servei per actualitzar la contrasenya
      this.usuariService
        .updateContrasenya(this.usuariSeleccionat.usuari, this.novaContrasenya)
        .then((response) => {
          this.textNoti = 'Contrasenya actualitzada correctament.';
          this.tipusNoti = 'ok';
          this.timeOutNoti();
          this.modificacioUsuariDialog = false;
        })
        .catch((error) => {
          this.textNoti = 'Error actualitzant la contrasenya: ' + error;
          this.tipusNoti = 'error';
          this.timeOutNoti();
        });
    }

    this.usuariService
      .updateRol(this.usuariSeleccionat.usuari, this.selectedRol)
      .then((response) => {
        this.textNoti = 'Rol actualitzat correctament.';
        this.tipusNoti = 'ok';
        this.timeOutNoti();
        this.modificacioUsuariDialog = false;
      })
      .catch((error) => {
        this.textNoti = 'Error actualitzant el rol: ' + error;
        this.tipusNoti = 'error';
        this.timeOutNoti();
      });
  }

  esborrarUsuari(usuari: any) {
    if (confirm(`Estàs segur que vols esborrar l'usuari ${usuari.usuari}?`)) {
      this.usuariService
        .deleteUsuari(usuari.usuari)
        .then((response) => {
          this.textNoti = 'Usuari esborrat correctament.';
          this.tipusNoti = 'ok';
          this.timeOutNoti();
          alert('Usuari esborrat correctament.');
          this.loadUsuaris(); // Torna a carregar la taula
        })
        .catch((error) => {
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
