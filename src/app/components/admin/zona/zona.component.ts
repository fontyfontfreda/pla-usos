import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ZonaService} from '../../../services/zona.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogAddComponent} from './dialog-add/dialog-add.component';

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
  imports: [FormsModule, CommonModule],
  templateUrl: './zona.component.html',
  styleUrl: './zona.component.css'
})

export class ZonaComponent {
  zones: Zona[] = [];
  missatge: string = "";
  missatgeError: string = "";

  constructor(private zonaService: ZonaService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadZones().then();
  }

  async loadZones() {
    this.zones = await this.zonaService.getZones();
    console.log(this.zones)
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
            this.missatge = `Zona ${result.codi} - ${result.descripcio} creada correctament.`;
          })
          .catch(error => {
            console.error("Error al crear la zona:", error);

            // Si l'error ve del backend, mostrem el missatge
            if (error.response && error.response.data) {
              this.missatgeError = error.response.data;
            } else {
              this.missatgeError = "S'ha produït un error en crear la zona.";
            }
          });
      }
    });
  }

  addArea(): void {
    if (this.zones.length === 0) {
      alert("No hi ha zones disponibles. Crea una zona primer.");
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
          if (mateixCodi)
            this.missatgeError = "Ja hi ha una zona amb aquest codi dins la zona " + zona.codi_zona + " - " +
              zona.descripcio_zona + ": " + mateixCodi.codi_area + " - " + mateixCodi.descripcio_area;
          else {
            this.zonaService.addArea({codi_area: result.zonaCodi + '.' + result.codi, descripcio_area: result.descripcio})
              .then(r => {
                zona.arees.push({codi_area: zona.codi_zona + '.' + result.codi, descripcio_area: result.descripcio});
                this.missatge = `Àrea ${zona.codi_zona + '.' + result.codi} - ${result.descripcio} creada correctament.`;
              })
              .catch(error => {
                console.error("Error al crear l'àrea':", error);

                // Si l'error ve del backend, mostrem el missatge
                if (error.response && error.response.data) {
                  this.missatgeError = error.response.data;
                } else {
                  this.missatgeError = "S'ha produït un error en crear l'àrea.";
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

    // Inicialitzem el missatge d'error a buit
    this.missatgeError = "";

    this.zonaService.deleteZona(zona.codi_zona)
      .then(r => {
        this.missatge = `Zona ${zona.codi_zona} ${zona.descripcio_zona} eliminada correctament.`;
        this.loadZones()
      })
      .catch(error => {
        console.error("Error eliminant la zona:", error);

        // Si l'error ve del backend, mostrem el missatge
        if (error.response && error.response.data) {
          this.missatgeError = error.response.data;
        } else {
          this.missatgeError = "S'ha produït un error en eliminar la zona.";
        }
      });
  }

  deleteArea(area: Area): void {
    // Demanem confirmació abans d'eliminar
    const confirmacio = window.confirm(`Segur que vols eliminar l'àrea ${area.codi_area} - ${area.descripcio_area}?`);

    if (!confirmacio) {
      return; // Si l'usuari cancel·la, no fem res
    }

    // Inicialitzem el missatge d'error a buit
    this.missatgeError = "";

    this.zonaService.deleteArea(area.codi_area)
      .then(r => {
        this.missatge = `Àrea ${area.codi_area} ${area.descripcio_area} eliminada correctament.`;
        this.loadZones()
      })
      .catch(error => {
        console.error("Error eliminant l'àrea:", error);

        // Si l'error ve del backend, mostrem el missatge
        if (error.response && error.response.data) {
          this.missatgeError = error.response.data;
        } else {
          this.missatgeError = "S'ha produït un error en eliminar l'àrea.";
        }
      });
  }
}
