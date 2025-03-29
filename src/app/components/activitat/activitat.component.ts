import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activitat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './activitat.component.html',
  styleUrl: './activitat.component.css'
})
export class ActivitatComponent {
  @Output() activitatSubmit = new EventEmitter<any>(); // Emissor d'esdeveniments per a l'activitat
  @Output() goBackEvent = new EventEmitter<number>(); // Emissor d'esdeveniments per tornar enrera

  formData = {
    activitat: '',
  };

  onSubmit() {
    this.activitatSubmit.emit(this.formData); // Enviar les dades de l'activitat al component pare
  }

  goBack() {
    this.goBackEvent.emit(3);
  }
}
