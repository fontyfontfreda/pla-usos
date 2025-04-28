import {Component, ViewChild} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ZonaComponent} from './zona/zona.component';
import {AdrecaComponent} from './adreca/adreca.component';
import {UsuariComponent} from './usuari/usuari.component';
import {ConsultaComponent} from './consulta/consulta.component';
import {ActivitatComponent} from './activitat/activitat.component';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, ZonaComponent, AdrecaComponent, UsuariComponent, NgIf, ConsultaComponent, ActivitatComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  zonaComponent: boolean = true;
  adrecaComponent: boolean = false;
  usuariComponent: boolean = false;
  consultaComponent: boolean = false;
  activitatComponent: boolean = false;


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
      case 4:
        this.consultaComponent = true;
        break;
      case 5:
        this.activitatComponent = true;
        break;
      default:
        break;
    }
  }

  tancarPagines() {
    this.zonaComponent = false;
    this.adrecaComponent = false;
    this.usuariComponent = false;
    this.consultaComponent = false;
    this.activitatComponent = false;
  }
}
