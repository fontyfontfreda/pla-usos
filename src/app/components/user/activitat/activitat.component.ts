import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Adreca} from '../../../models/adreca.model';
import {Activitat} from '../../../models/activitat.model';
import {ActivitatService} from '../../../services/activitat.service';
import {NgForOf, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-activitat',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf, NgStyle],
  templateUrl: './activitat.component.html',
  styleUrl: './activitat.component.css'
})
export class ActivitatComponent {
  @Input() adreca!: Adreca | null;
  @Output() activitatSubmit = new EventEmitter<any>(); // Emissor d'esdeveniments per a l'activitat
  @Output() goBackEvent = new EventEmitter<number>(); // Emissor d'esdeveniments per tornar enrera

  activitats: Activitat[] = [];

  formData = {
    activitat: '',
  };

  grups: string[] = [];
  filteredGrups: string[] = [];
  subgrups: string[] = [];
  filteredSubgrups: string[] = [];
  activitatsFiltrades: string[] = [];
  filteredDescripcions: string[] = [];

  altres: boolean = false;

  selectedGrup: string = '';
  selectedSubgrup: string = '';
  selectedActivitat: string = '';

  constructor(private activitatService: ActivitatService) {
  }

  ngOnInit() {
    this.activitatService.getActivitats(this.adreca).then(data => {
      this.activitats = data;
      console.log(this.activitats);
      this.grups = [...new Set(this.activitats.map(a => a.descripcio_grup))];
      this.subgrups = [...new Set(this.activitats.map(a => a.descripcio_subgrup))];
      this.activitatsFiltrades = [...new Set(this.activitats.map(a => a.descripcio_descripcio_activitat)), "Altres"]
    });
  }

  //GRUPS
  onGrupChange() {
    this.subgrups = [
      ...new Set(
        this.activitats
          .filter(a => a.descripcio_grup === this.selectedGrup)
          .map(a => a.descripcio_subgrup)
      )
    ];
    this.selectedSubgrup = '';
    this.activitatsFiltrades = [...new Set(this.activitats
      .filter(a => a.descripcio_grup === this.selectedGrup)
      .map(a => a.descripcio_descripcio_activitat)), "Altres"];
    this.selectedActivitat = '';
  }

  filterGrup(event: any) {
    const query = event.target.value.toLowerCase();
    if (query.length >= 1) {  // Només es filtra quan hi ha almenys 1 caràcter
      this.filteredGrups = this.grups.filter(grup =>
        (grup).toLowerCase().includes(query));
    } else {
      this.filteredGrups = [];  // Si l'usuari escriu menys d'1 caràcter, es buida la llista
    }
  }

  selectGrup(grup: string) {
    this.selectedGrup = grup;
    this.onGrupChange();
    this.filteredGrups = []
  }

  //SUBGRUPS
  onSubgrupChange() {
    // @ts-ignore
    this.selectedGrup = this.activitats.find(a => a.descripcio_subgrup === this.selectedSubgrup).descripcio_grup;

    this.subgrups = [
      ...new Set(
        this.activitats
          .filter(a => a.descripcio_grup === this.selectedGrup)
          .map(a => a.descripcio_subgrup)
      )
    ];
    this.activitatsFiltrades = [...new Set(this.activitats
      .filter(a => a.descripcio_grup === this.selectedGrup && a.descripcio_subgrup === this.selectedSubgrup)
      .map(a => a.descripcio_descripcio_activitat)), "Altres"];
  }

  filterSubgrup(event: any) {
    const query = event.target.value.toLowerCase();
    if (query.length >= 1) {  // Només es filtra quan hi ha almenys 1 caràcter
      this.filteredSubgrups = this.subgrups.filter(subgrup =>
        (subgrup).toLowerCase().includes(query));
    } else {
      this.filteredSubgrups = [];  // Si l'usuari escriu menys d'1 caràcter, es buida la llista
    }
  }

  selectSubgrup(subgrup: string) {
    this.selectedSubgrup = subgrup;
    this.onSubgrupChange();
    this.filteredSubgrups = []
  }

  //DESRIPCIONS
  onDescripcioChange() {
    if (this.selectedActivitat != "Altres") {
      this.altres = false;
      // @ts-ignore
      this.selectedGrup = this.activitats.find(a => a.descripcio_descripcio_activitat === this.selectedActivitat).descripcio_grup;

      // @ts-ignore
      this.selectedSubgrup = this.activitats.find(a => a.descripcio_descripcio_activitat === this.selectedActivitat).descripcio_subgrup;

      this.subgrups = [
        ...new Set(
          this.activitats
            .filter(a => a.descripcio_grup === this.selectedGrup)
            .map(a => a.descripcio_subgrup)
        )
      ];

      this.activitatsFiltrades = [...new Set(this.activitats
        .filter(a => a.descripcio_grup === this.selectedGrup && a.descripcio_subgrup === this.selectedSubgrup)
        .map(a => a.descripcio_descripcio_activitat)), "Altres"];
    } else
      this.altres = true;
  }

  filterDescripcio(event: any) {
    const query = event.target.value.toLowerCase();
    if (query.length >= 1) {  // Només es filtra quan hi ha almenys 1 caràcter
      this.filteredDescripcions = this.activitatsFiltrades.filter(descripcio =>
        (descripcio).toLowerCase().includes(query));
    } else {
      this.filteredDescripcions = [];  // Si l'usuari escriu menys d'1 caràcter, es buida la llista
    }
  }

  selectDescripcio(descripcio: string) {
    this.selectedActivitat = descripcio;
    this.onDescripcioChange();
    this.filteredDescripcions = []
  }

  getColor(activitat: string): string {
    let condicio = this.activitats.find(a => a.descripcio_descripcio_activitat === activitat)?.id_condicio;
    if (!condicio) return 'black';
    else if (+condicio == 2 || +condicio == 3) return 'green';
    if (+condicio == 1) return 'red';

    return 'orange';
  }


  onSubmit() {
    this.formData.activitat = this.selectedActivitat;
    this.activitatSubmit.emit(this.formData);
  }

  goBack() {
    this.goBackEvent.emit(3);
  }
}
