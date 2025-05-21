import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dades-usuari',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './dades-usuari.component.html',
  styleUrls: ['./dades-usuari.component.css']
})
export class DadesUsuariComponent {
  @Output() dadesUsuariSubmit = new EventEmitter<any>(); // Emissor d'esdeveniments per a les dades de l'usuari
  @Output() goBackEvent = new EventEmitter<number>(); // Emissor d'esdeveniments per tornar enrera

  error: string = '';


  formData = {
    nom: '',
    dni: '',
    actuaComA: 'propietari'
  };

  onSubmit() {
    if (this.formData.nom == '')
      this.error = 'Falta el camp nom per omplir.'
    else if (this.formData.dni == '')
      this.error = 'Falta el camp dni per omplir.'
    else if (!this.validarDNI(this.formData.dni))
      this.error = 'El DNI introduït és incorrecte.'
    else {
      this.dadesUsuariSubmit.emit(this.formData); // Enviar les dades de l'usuari al component pare
      this.error = '';
    }
  }

  validarDNI(dni: string) {
    const dniPattern = /^[0-9]{8}[A-Z]$/i;
    const lletres = "TRWAGMYFPDXBNJZSQVHLCKE";

    if (!dniPattern.test(dni)) {
      return false;
    }

    const numero = dni.substring(0, 8);
    const lletra = dni.charAt(8).toUpperCase();
    const lletraCorrecta = lletres.charAt(parseInt(numero, 10) % 23);

    return lletra === lletraCorrecta;
  }


  goBack() {
    this.formData = {
      nom: '',
      dni: '',
      actuaComA: 'propietari'
    };
    this.goBackEvent.emit(1);
  }
}
