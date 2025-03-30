import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ZonaService} from '../../../services/zona.service';

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
  newZona: Zona = {codi_zona: 0, descripcio_zona: '', arees: []};
  newArea: Area = {codi_area: "0", descripcio_area: ''};
  missatge: string = "";
  missatgeError: string = "";

  constructor(private zonaService: ZonaService) {
  }

  ngOnInit(): void {
    this.loadZones();
  }

  async loadZones() {
    this.zones = await this.zonaService.getZones();
    console.log(this.zones)
  }

  addZona() {
    //   if (this.newZona.descripcio_zona.trim()) {
    //     this.zonaService.addZona(this.newZona);
    //     this.newZona = { codi_zona: 0, descripcio_zona: '', arees: [] };  // Reset form
    //   }
  }

  //
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

  //
  addArea(): void {
    //   if (this.newArea.descripcio_area.trim()) {
    //     this.zonaService.addArea(codi_zona, this.newArea);
    //     this.newArea = { codi_area: 0, descripcio_area: '' };  // Reset form
    //   }
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
