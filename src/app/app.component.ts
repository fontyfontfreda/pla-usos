//src/app/app.component.ts
import { Component } from '@angular/core';
import { FormulariComponent } from './components/formulari/formulari.component'; // 🔹 Importa el component

@Component({
  selector: 'app-root',
  standalone: true, // 🔹 Comprovació que és un component standalone
  templateUrl: './app.component.html',
  imports: [FormulariComponent] // 🔹 Aquí afegim el component perquè sigui reconegut
})
export class AppComponent {
  title = 'adreces-app';
}
