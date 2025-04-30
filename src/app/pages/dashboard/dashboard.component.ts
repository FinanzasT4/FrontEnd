import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {Router} from '@angular/router';
import {NavbarComponent} from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <app-navbar></app-navbar>
    <div class="dashboard-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
    }
  `],
  imports: [SharedModule, NavbarComponent]
})
export class DashboardComponent {

  constructor(private router: Router) {}

  // Variables del formulario
  precioVenta: number = 0;
  cuotaInicial: number = 0;
  frecuencia: string = 'Mensual';
  anios: number = 1;
  tea: number = 0;
  plazoGracia: 'T' | 'P' | 'N' = 'N';

  calcularBono() {
    console.log('Calculando flujo...');
    console.log({
      precioVenta: this.precioVenta,
      cuotaInicial: this.cuotaInicial,
      frecuencia: this.frecuencia,
      anios: this.anios,
      tea: this.tea,
      plazoGracia: this.plazoGracia,
    });

    this.router.navigate(['/dashboard/results']);
  }
}
