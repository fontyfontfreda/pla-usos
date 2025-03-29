import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],  // Afegeix RouterModule aquí
  template: '<router-outlet></router-outlet>',  // Aquí es mostrarà el contingut segons la ruta
})
export class AppComponent {
  // No cal cap codi extra per aquí
}
