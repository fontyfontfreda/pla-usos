import {Component, OnInit, ViewChild} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ZonaComponent} from './zona/zona.component';
import {AdrecaComponent} from './adreca/adreca.component';
import {UsuariComponent} from './usuari/usuari.component';
import {ConsultaComponent} from './consulta/consulta.component';
import {ActivitatComponent} from './activitat/activitat.component';
import {MantenimentComponent} from '../manteniment/manteniment.component';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MantenimentService} from '../../services/manteniment.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, ZonaComponent, AdrecaComponent, UsuariComponent, NgIf, ConsultaComponent, ActivitatComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  zonaComponent: boolean = true;
  adrecaComponent: boolean = false;
  usuariComponent: boolean = false;
  consultaComponent: boolean = false;
  activitatComponent: boolean = false;

  constructor(private mantenimentService: MantenimentService) {
  }

  async ngOnInit() {
    await this.mantenimentService.health();
  }

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
