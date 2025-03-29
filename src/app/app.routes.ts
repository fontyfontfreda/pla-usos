// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { FormulariComponent } from './components/formulari/formulari.component';
import { ZonaComponent } from './components/admin/zona/zona.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AuthGuard } from './guards/auth.guard';  // Importa el guard

export const routes: Routes = [
  { path: '', redirectTo: '/formulari', pathMatch: 'full' },
  { path: 'formulari', component: FormulariComponent },
  {
    path: 'admin',
    component: ZonaComponent,
    canActivate: [AuthGuard]  // Afegim el guard a la ruta
  },
  { path: 'login', component: LoginComponent }  // Pàgina de login
];
