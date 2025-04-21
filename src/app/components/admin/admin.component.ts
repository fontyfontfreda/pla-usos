import {Component, ViewChild} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ZonaComponent} from './zona/zona.component';
import {AdrecaComponent} from './adreca/adreca.component';
import {NgIf} from '@angular/common';
import {UsuariComponent} from './usuari/usuari.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, ZonaComponent, AdrecaComponent, UsuariComponent, NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  zonaComponent: boolean = true;
  adrecaComponent: boolean = false;
  usuariComponent: boolean = false;


  canviComponent(pagina: number) {
    this.tancarPagines();
    switch (pagina) {
      case 1:
        this.zonaComponent = true;
        break;
      case 2:
        this.adrecaComponent = true;
        break;
      case 3:
        this.usuariComponent = true;
        break;
      default:
        break;
    }
  }

  tancarPagines() {
    this.zonaComponent = false;
    this.adrecaComponent = false;
    this.usuariComponent = false;
  }
}
