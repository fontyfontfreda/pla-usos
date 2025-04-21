// src/app/app.routes.ts
import {Routes} from '@angular/router';
import {FormulariComponent} from './components/user/formulari/formulari.component';
import {LoginComponent} from './components/admin/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {AdminComponent} from './components/admin/admin.component';
import {LoginGuard} from './guards/login.guard';  // Importa el guard

export const routes: Routes = [
  {path: '', redirectTo: '/formulari', pathMatch: 'full'},
  {path: 'formulari', component: FormulariComponent},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard], // 👈 El proteges amb LoginGuard
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/formulari',
  },
];
