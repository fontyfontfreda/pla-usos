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
  subgrups: string[] = [];
  activitatsFiltrades: string[] = [];

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
      this.activitatsFiltrades = [...new Set(this.activitats.map(a => a.descripcio_descripcio_activitat))]
    });
  }

  onGrupChange() {
    this.subgrups = [
      ...new Set(
        this.activitats
          .filter(a => a.descripcio_grup === this.selectedGrup)
          .map(a => a.descripcio_subgrup)
      )
    ];
    this.selectedSubgrup = '';
    this.activitatsFiltrades = [];
    this.selectedActivitat = '';
  }

  onSubgrupChange() {
    if (!this.selectedGrup) {
      // @ts-ignore
      this.selectedGrup = this.activitats.find(a => a.descripcio_subgrup === this.selectedSubgrup).descripcio_grup;

      this.subgrups = [
        ...new Set(
          this.activitats
            .filter(a => a.descripcio_grup === this.selectedGrup)
            .map(a => a.descripcio_subgrup)
        )
      ];
    }
    this.activitatsFiltrades = this.activitats
      .filter(a => a.descripcio_grup === this.selectedGrup && a.descripcio_subgrup === this.selectedSubgrup)
      .map(a => a.descripcio_descripcio_activitat);
  }

  onDescripcioChange() {
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

    this.activitatsFiltrades = this.activitats
      .filter(a => a.descripcio_grup === this.selectedGrup && a.descripcio_subgrup === this.selectedSubgrup)
      .map(a => a.descripcio_descripcio_activitat);

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
