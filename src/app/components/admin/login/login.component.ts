// src/app/components/login/login.component.ts
import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MantenimentService} from '../../../services/manteniment.service';
import {NotificacioComponent} from '../../shared/notificacio/notificacio.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, NotificacioComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';

  textNoti: string = '';
  tipusNoti: 'error' | 'ok' | 'info' = 'info';

  constructor(private authService: AuthService, private router: Router, private mantenimentService: MantenimentService) {
  }

  async ngOnInit() {
    await this.mantenimentService.health();
  }

  onSubmit() {
    this.authService.login(this.username, this.password).then((success) => {
      if (success) {
        this.router.navigate(['/admin']); // Redirigeix si el login és correcte
      } else {
        this.textNoti = 'Credencials incorrectes';
        this.tipusNoti = 'error';
        this.timeOutNoti();
      }
    }).catch((error) => {
      this.textNoti = 'Error al realitzar el login: ' + error;
      this.tipusNoti = 'error';
      this.timeOutNoti();
      alert('Error de connexió');
    });
  }

  private timeOutNoti() {
    setTimeout(() => {
      this.textNoti = '';
    }, 2500);
  }
}
