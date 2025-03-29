import {Component, ViewChild} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ZonaComponent} from './zona/zona.component';
import {LocalComponent} from './local/local.component';
import {AdrecaComponent} from './adreca/adreca.component';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, ZonaComponent, LocalComponent, AdrecaComponent, NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  zonaComponent: boolean = true;
  localComponent: boolean = false;
  adrecaComponent: boolean = false;


  canviComponent(pagina: number) {
    this.tancarPagines();
    switch (pagina) {
      case 1:
        this.zonaComponent = true;
        break;
      case 2:
        this.localComponent = true;
        break;
      case 3:
        this.adrecaComponent = true;
        break;
      default:
        break;
    }
  }

  tancarPagines() {
    this.zonaComponent = false;
    this.adrecaComponent = false;
    this.localComponent = false;
  }
}
