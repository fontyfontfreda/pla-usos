import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dades-usuari',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dades-usuari.component.html',
  styleUrls: ['./dades-usuari.component.css']
})
export class DadesUsuariComponent {
  @Output() dadesUsuariSubmit = new EventEmitter<any>(); // Emissor d'esdeveniments per a les dades de l'usuari
  @Output() goBackEvent = new EventEmitter<number>(); // Emissor d'esdeveniments per tornar enrera


  formData = {
    nom: '',
    dni: '',
    actuaComA: 'propietari'
  };

  onSubmit() {
    this.dadesUsuariSubmit.emit(this.formData); // Enviar les dades de l'usuari al component pare
  }

  goBack() {
    this.goBackEvent.emit(1);
  }
}
