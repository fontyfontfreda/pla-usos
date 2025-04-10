import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-presentacio',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './presentacio.component.html',
  styleUrl: './presentacio.component.css'
})
export class PresentacioComponent {
  @Output() presentacioSubmit = new EventEmitter<any>();

  onSubmit() {
    this.presentacioSubmit.emit(); // Enviar l'acció al formulari
  }
}
