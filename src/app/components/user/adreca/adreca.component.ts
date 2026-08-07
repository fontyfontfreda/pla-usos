import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AdrecaService} from '../../../services/adreca.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Adreca} from '../../../models/adreca.model';  // Importa FormsModule
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-adreca',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],  // Inclou FormsModule aquí per habilitar ngModel
  templateUrl: './adreca.component.html',
  styleUrls: ['./adreca.component.css']
})
export class AdrecaComponent {
  @Input() adrecaSeleccionada = '';  // Dades d'adreça inicials (si es proporcionen des del component pare)
  @Output() adrecaSubmit = new EventEmitter<Adreca | null>(); // Emissor d'esdeveniments per a l'adreça
  @Output() goBackEvent = new EventEmitter<number>(); // Emissor d'esdeveniments per tornar enrera

  filteredAdreces: Adreca[] = [];
  adreca: Adreca | null = null;

  modalError: boolean = false;
  srcUrl!: SafeResourceUrl;
  private filterDebounceId: any = null;

  constructor(private adrecaService: AdrecaService, private sanitizer: DomSanitizer) {
    this.safeUrl("0", "0");
  }

  safeUrl(x: string, y: string) {
    if (x !== "0" && y !== "0") {
      const url = `https://sig.olot.cat/minimapa/Pla-usos.asp?X=${x}&Y=${y}`;
      this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  filterAdreces(event: any) {
    const query = event.target.value.toLowerCase();
    if (this.filterDebounceId) {
      clearTimeout(this.filterDebounceId);
    }
    if (query.length >= 3) {  // Només es cerca quan hi ha almenys 3 caràcters
      this.filterDebounceId = setTimeout(async () => {
        const { data } = await this.adrecaService.getAdreces(1, 20, query);
        this.filteredAdreces = data;
      }, 300);
    } else {
      this.filteredAdreces = [];  // Si l'usuari escriu menys de 3 caràcters, es buida la llista
    }
  }

  selectAdreca(adreca: any) {
    this.adrecaSeleccionada = `${adreca.adreca}`;
    this.adreca = adreca;
    this.filteredAdreces = [];  // Esborrar les opcions després de la selecció
    this.safeUrl(adreca.coord_x, adreca.coord_y);
  }

  onSubmit() {
    if (this.adreca)
      this.adrecaSubmit.emit(this.adreca); // Enviar l'adreça seleccionada al component pare
    else
      this.modalError = true;
  }

  goBack() {
    this.adreca = null;
    this.goBackEvent.emit(2);
  }

  tancarModal() {
    this.modalError = false;
  }
}

