import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfiguracioService } from '../../../services/configuracio.service';

@Component({
  selector: 'app-presentacio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './presentacio.component.html',
  styleUrl: './presentacio.component.css',
})
export class PresentacioComponent {
  @Output() presentacioSubmit = new EventEmitter<any>();

  link: string = '';

  constructor(private configuracioService: ConfiguracioService) {}

  async ngOnInit() {
    this.link = await this.configuracioService.getLink();    
  }

  onSubmit() {
    this.presentacioSubmit.emit(); // Enviar l'acció al formulari
  }
}
