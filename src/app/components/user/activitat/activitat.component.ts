import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Adreca} from '../../../models/adreca.model';
import {Activitat} from '../../../models/activitat.model';
import {ActivitatService} from '../../../services/activitat.service';

@Component({
  selector: 'app-activitat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './activitat.component.html',
  styleUrl: './activitat.component.css'
})
export class ActivitatComponent {
  @Input() adreca!: Adreca | null;
  @Output() activitatSubmit = new EventEmitter<any>(); // Emissor d'esdeveniments per a l'activitat
  @Output() goBackEvent = new EventEmitter<number>(); // Emissor d'esdeveniments per tornar enrera

  activitats: Activitat[] = [];

  constructor(private activitatService: ActivitatService) {
  }

  async ngOnInit() {
    this.activitats = await this.activitatService.getActivitats(this.adreca);
  }

  formData = {
    activitat: '',
  };

  onSubmit() {
    this.activitatSubmit.emit(this.formData); // Enviar les dades de l'activitat al component pare
  }

  goBack() {
    this.goBackEvent.emit(3);
  }
}
