import {Component, OnInit, ViewChild} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ZonaComponent} from './zona/zona.component';
import {AdrecaComponent} from './adreca/adreca.component';
import {UsuariComponent} from './usuari/usuari.component';
import {ConsultaComponent} from './consulta/consulta.component';
import {ActivitatComponent} from './activitat/activitat.component';
import {EpigrafComponent} from './epigrafs/epigraf.component';
import {ConfiguracioComponent} from './configuracio/configuracio.component';
import {NgIf} from '@angular/common';
import {MantenimentService} from '../../services/manteniment.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, ZonaComponent, AdrecaComponent, UsuariComponent, NgIf, ConsultaComponent, ActivitatComponent, EpigrafComponent, ConfiguracioComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  zonaComponent: boolean = true;
  adrecaComponent: boolean = false;
  usuariComponent: boolean = false;
  consultaComponent: boolean = false;
  activitatComponent: boolean = false;
  epigrafComponent: boolean = false;
  configuracioComponent: boolean = false;

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
      case 6:
        this.epigrafComponent = true;
        break;
      case 7:
        this.configuracioComponent = true;
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
    this.epigrafComponent = false;
    this.configuracioComponent = false;
  }
}
