// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { FormulariComponent } from './components/user/formulari/formulari.component';
import { ZonaComponent } from './components/admin/zona/zona.component';
import { LocalComponent } from './components/admin/local/local.component';
import { AdrecaComponent } from './components/admin/adreca/adreca.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import {AdminComponent} from './components/admin/admin.component';  // Importa el guard

export const routes: Routes = [
  { path: '', redirectTo: '/formulari', pathMatch: 'full' },
  { path: 'formulari', component: FormulariComponent },
  {
    path: 'admin', component: AdminComponent,
    //canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
