import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { BondService } from '../../services/bond.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  template: `
    <app-navbar></app-navbar>
    <div class="container">
      <h2>Historial de Bonos</h2>
      <table *ngIf="bonds.length > 0">
        <tr>
          <th>Nombre</th>
          <th>Valor Nominal</th>
          <th>Precio Compra</th>
          <th>Fecha Emisión</th>
          <th>Fecha Vencimiento</th>
        </tr>
        <tr *ngFor="let bond of bonds">
          <td>{{ bond.bondName }}</td>
          <td>{{ bond.faceValue }}</td>
          <td>{{ bond.purchasePrice }}</td>
          <td>{{ bond.issueDate }}</td>
          <td>{{ bond.maturityDate }}</td>
        </tr>
      </table>
      <p *ngIf="bonds.length === 0">No hay bonos registrados.</p>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 0.8rem;
      border: 1px solid #ccc;
    }
  `]
})
export class RecordsComponent implements OnInit {
  bonds: any[] = [];

  constructor(private bondService: BondService) {}

  ngOnInit() {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) return;

    this.bondService.getBondsByUserId(userId).subscribe({
      next: (data) => this.bonds = data,
      error: (err) => console.error('Error fetching bonds', err)
    });
  }
}
