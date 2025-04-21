// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).then((success) => {
      if (success) {
        this.router.navigate(['/admin']); // Redirigeix si el login és correcte
      } else {
        alert('Credencials incorrectes');
      }
    }).catch((error) => {
      console.error('Error al realitzar el login:', error);
      alert('Error de connexió');
    });
  }
}
