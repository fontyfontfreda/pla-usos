import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-local',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './local.component.html',
  styleUrl: './local.component.css'
})
export class LocalComponent {

}
