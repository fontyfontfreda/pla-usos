import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ZonaService} from '../../../services/zona.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogAddComponent} from './dialog-add/dialog-add.component';
import {NotificacioComponent} from '../../shared/notificacio/notificacio.component';

interface Area {
  codi_area: string;
  descripcio_area: string;
}

interface Zona {
  codi_zona: number;
  descripcio_zona: string;
  arees: Area[];
}

@Component({
  selector: 'app-zona',
  standalone: true,
  imports: [FormsModule, CommonModule, NotificacioComponent],
  templateUrl: './zona.component.html',
  styleUrl: './zona.component.css'
})

export class ZonaComponent {
  zones: Zona[] = [];

  textNoti: string = '';
  tipusNoti: 'error' | 'ok' | 'info' = 'info';

  constructor(private zonaService: ZonaService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadZones().then();
  }

  async loadZones() {
    try {
    this.zones = await this.zonaService.getZones();
    } catch (error) {
      this.textNoti = 'Error carregant les zones';
      this.tipusNoti = 'error';
      this.timeOutNoti();
    }
  }

  addZona(): void {
    const dialogRef = this.dialog.open(DialogAddComponent, {
      width: '500px',
      data: {tipus: 1}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.zonaService.addZona({codi_zona: result.codi, descripcio_zona: result.descripcio, arees: []})
          .then(r => {
            this.zones.push({codi_zona: result.codi, descripcio_zona: result.descripcio, arees: []});
            this.textNoti = `Zona ${result.codi} - ${result.descripcio} creada correctament.`;
            this.tipusNoti = 'ok';
            this.timeOutNoti();
          })
          .catch(error => {
            console.error("Error al crear la zona:", error);
            // Si l'error ve del backend, mostrem el missatge
            if (error.response && error.response.data) {
              this.textNoti = `error.response.data`;
              this.tipusNoti = 'error';
              this.timeOutNoti();
            } else {
              this.textNoti = "S'ha produït un error en crear la zona.";
              this.tipusNoti = 'error';
              this.timeOutNoti();
            }
          });
      }
    });
  }

  addArea(): void {
    if (this.zones.length === 0) {
      this.textNoti = "No hi ha zones disponibles. Crea una zona primer.";
      this.tipusNoti = 'info';
      this.timeOutNoti();
      return;
    }

    const dialogRef = this.dialog.open(DialogAddComponent, {
      width: '500px',
      data: {tipus: 2, zones: this.zones}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const zona = this.zones.find(z => z.codi_zona === +result.zonaCodi);
        console.log(zona)
        if (zona) {
          const mateixCodi = zona.arees.find(a => a.codi_area === zona.codi_zona + '.' + result.codi);
          if (mateixCodi){
            this.textNoti = "Ja hi ha una zona amb aquest codi dins la zona " + zona.codi_zona + " - " +
              zona.descripcio_zona + ": " + mateixCodi.codi_area + " - " + mateixCodi.descripcio_area;
            this.tipusNoti = 'error';
            this.timeOutNoti();
          }
          else {
            this.zonaService.addArea({codi_area: result.zonaCodi + '.' + result.codi, descripcio_area: result.descripcio})
              .then(r => {
                zona.arees.push({codi_area: zona.codi_zona + '.' + result.codi, descripcio_area: result.descripcio});
                this.textNoti = `Àrea ${zona.codi_zona + '.' + result.codi} - ${result.descripcio} creada correctament.`;
                this.tipusNoti = 'ok';
                this.timeOutNoti();
              })
              .catch(error => {
                console.error("Error al crear l'àrea':", error);
                // Si l'error ve del backend, mostrem el missatge
                if (error.response && error.response.data) {
                  this.textNoti = error.response.data;
                  this.tipusNoti = 'error';
                  this.timeOutNoti();
                } else {
                  this.textNoti = "S'ha produït un error en crear l'àrea.";
                  this.tipusNoti = 'error';
                  this.timeOutNoti();
                }
              });
          }
        }
      }
    });
  }

  deleteZona(zona: Zona) {
    // Demanem confirmació abans d'eliminar
    const confirmacio = window.confirm(`Segur que vols eliminar la zona ${zona.codi_zona} - ${zona.descripcio_zona}?`);

    if (!confirmacio) {
      return; // Si l'usuari cancel·la, no fem res
    }

    this.zonaService.deleteZona(zona.codi_zona)
      .then(r => {
        this.textNoti = `Zona ${zona.codi_zona} ${zona.descripcio_zona} eliminada correctament.`;
        this.tipusNoti = 'ok';
        this.timeOutNoti();
        this.loadZones()
      })
      .catch(error => {
        console.error("Error eliminant la zona:", error);

        // Si l'error ve del backend, mostrem el missatge
        if (error.response && error.response.data) {
          this.textNoti = error.response.data;
          this.tipusNoti = 'error';
          this.timeOutNoti();
        } else {
          this.textNoti = "S'ha produït un error en eliminar la zona.";
          this.tipusNoti = 'error';
          this.timeOutNoti();
        }
      });
  }

  deleteArea(area: Area): void {
    // Demanem confirmació abans d'eliminar
    const confirmacio = window.confirm(`Segur que vols eliminar l'àrea ${area.codi_area} - ${area.descripcio_area}?`);

    if (!confirmacio) {
      return; // Si l'usuari cancel·la, no fem res
    }

    this.zonaService.deleteArea(area.codi_area)
      .then(r => {
        this.textNoti = `Àrea ${area.codi_area} ${area.descripcio_area} eliminada correctament.`;
        this.tipusNoti = 'ok';
        this.timeOutNoti();
        this.loadZones()
      })
      .catch(error => {
        console.error("Error eliminant l'àrea:", error);

        // Si l'error ve del backend, mostrem el missatge
        if (error.response && error.response.data) {
          this.textNoti = error.response.data;
          this.tipusNoti = 'error';
          this.timeOutNoti();
        } else {
          this.textNoti = "S'ha produït un error en eliminar l'àrea.";
          this.tipusNoti = 'error';
          this.timeOutNoti();
        }
      });
  }

  private timeOutNoti() {
    setTimeout(() => {
      this.textNoti = '';
    }, 2500);
  }
}
