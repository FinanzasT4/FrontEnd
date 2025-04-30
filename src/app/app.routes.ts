import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {BonoFormComponent} from './pages/bono-form/bono-form.component';
import { ConfigurationComponent } from './pages/configuracion/configuration.component';
import { ResultsComponent } from './pages/resultados/resultados.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {RecordsComponent} from './pages/records/records.component';
import {RegisterComponent} from './pages/register/register.component';

export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bond', component: BonoFormComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'results/:id', component: ResultsComponent },
  { path: 'records', component: RecordsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
]
