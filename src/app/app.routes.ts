import { Routes } from '@angular/router';
import { FormulariComponent } from './components/formulari/formulari.component';

export const routes: Routes = [
  { path: '', redirectTo: '/formulari', pathMatch: 'full' },
  { path: 'formulari', component: FormulariComponent }
];
