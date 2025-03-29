import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AdrecaService} from '../../../services/adreca.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';  // Importa FormsModule

@Component({
  selector: 'app-adreca',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],  // Inclou FormsModule aquí per habilitar ngModel
  templateUrl: './adreca.component.html',
  styleUrls: ['./adreca.component.css']
})
export class AdrecaComponent {
  @Input() adrecaSeleccionada = '';  // Dades d'adreça inicials (si es proporcionen des del component pare)
  @Output() adrecaSubmit = new EventEmitter<string>(); // Emissor d'esdeveniments per a l'adreça
  @Output() goBackEvent = new EventEmitter<number>(); // Emissor d'esdeveniments per tornar enrera

  adreces: any[] = [];
  filteredAdreces: any[] = [];

  constructor(private adrecaService: AdrecaService) {
  }

  async ngOnInit() {
    this.adreces = await this.adrecaService.getAdreces();
    this.filteredAdreces = [];  // Inicialment no mostrem cap adreça
  }

  filterAdreces(event: any) {
    const query = event.target.value.toLowerCase();
    if (query.length >= 3) {  // Només es filtra quan hi ha almenys 3 caràcters
      this.filteredAdreces = this.adreces.filter(adreca =>
        (adreca.carrer + ', ' + adreca.numero).toLowerCase().includes(query));
    } else {
      this.filteredAdreces = [];  // Si l'usuari escriu menys de 3 caràcters, es buida la llista
    }
  }

  selectAdreca(adreca: any) {
    this.adrecaSeleccionada = `${adreca.carrer}, ${adreca.numero}`;
    this.filteredAdreces = [];  // Esborrar les opcions després de la selecció
  }

  onSubmit() {
    this.adrecaSubmit.emit(this.adrecaSeleccionada); // Enviar l'adreça seleccionada al component pare
    console.log(this.adrecaSeleccionada);
  }

  goBack() {
    this.goBackEvent.emit(2);
  }
}

