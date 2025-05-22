import { Component, Input } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-notificacio',
  standalone: true,
  templateUrl: './notificacio.component.html',
  imports: [
    NgClass
  ],
  styleUrls: ['./notificacio.component.css']
})
export class NotificacioComponent {
  @Input() text: string = '';
  @Input() tipus: 'error' | 'ok' | 'info' = 'info';
}
