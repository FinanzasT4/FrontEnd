import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from '../../services/result.service'; // Asegúrate que exista

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [SharedModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="resultados-globales">
      <mat-card>
        <mat-card-title>Resultados Financieros</mat-card-title>
        <mat-card-content>
          <div class="cards-grid">
            <mat-card class="resultado-card">Duración: <strong>{{ duracion.toFixed(2) }}</strong></mat-card>
            <mat-card class="resultado-card">Duración Modificada: <strong>{{ duracionModificada.toFixed(2) }}</strong></mat-card>
            <mat-card class="resultado-card">Convexidad: <strong>{{ convexidad.toFixed(2) }}</strong></mat-card>
            <mat-card class="resultado-card">TCEA (Emisor): <strong>{{ tcea.toFixed(2) }}%</strong></mat-card>
            <mat-card class="resultado-card">TREA (Bonista): <strong>{{ trea.toFixed(2) }}%</strong></mat-card>
            <mat-card class="resultado-card">Precio Máx. de Mercado: <strong>{{ precioMaximo | currency:moneda }}</strong></mat-card>
          </div>
        </mat-card-content>
      </mat-card>
    </div>

    <div class="tabla-results">
      <mat-card>
        <mat-card-title>Flujo de Caja - Método Americano</mat-card-title>
        <div class="tabla-scroll">
          <table mat-table [dataSource]="datos" class="mat-elevation-z8">

            <ng-container matColumnDef="n">
              <th mat-header-cell *matHeaderCellDef> N° del Periodo </th>
              <td mat-cell *matCellDef="let row"> {{ row.n }} </td>
            </ng-container>

            <ng-container matColumnDef="tea">
              <th mat-header-cell *matHeaderCellDef> TEA </th>
              <td mat-cell *matCellDef="let row"> {{ row.tea }} </td>
            </ng-container>

            <ng-container matColumnDef="tes">
              <th mat-header-cell *matHeaderCellDef> TES </th>
              <td mat-cell *matCellDef="let row"> {{ row.tes }} </td>
            </ng-container>

            <ng-container matColumnDef="gracia">
              <th mat-header-cell *matHeaderCellDef> Gracia </th>
              <td mat-cell *matCellDef="let row"> {{ row.gracia }} </td>
            </ng-container>

            <ng-container matColumnDef="saldoInicial">
              <th mat-header-cell *matHeaderCellDef> Saldo Inicial </th>
              <td mat-cell *matCellDef="let row"> {{ row.saldoInicial | currency:moneda }} </td>
            </ng-container>

            <ng-container matColumnDef="interes">
              <th mat-header-cell *matHeaderCellDef> Interés </th>
              <td mat-cell *matCellDef="let row"> {{ row.interes | currency:moneda }} </td>
            </ng-container>

            <ng-container matColumnDef="cuota">
              <th mat-header-cell *matHeaderCellDef> Cuota </th>
              <td mat-cell *matCellDef="let row"> {{ row.cuota | currency:moneda }} </td>
            </ng-container>

            <ng-container matColumnDef="amortizacion">
              <th mat-header-cell *matHeaderCellDef> Amort. </th>
              <td mat-cell *matCellDef="let row"> {{ row.amortizacion | currency:moneda }} </td>
            </ng-container>

            <ng-container matColumnDef="saldoFinal">
              <th mat-header-cell *matHeaderCellDef> Saldo Final </th>
              <td mat-cell *matCellDef="let row"> {{ row.saldoFinal | currency:moneda }} </td>
            </ng-container>
          </table>
        </div>
      </mat-card>
    </div>
  `,
  styles: `
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .resultado-card {
      padding: 1rem;
      text-align: center;
      font-size: 1rem;
      font-weight: 500;
    }

    .tabla-results {
      margin-top: 2rem;
    }
  `
})
export class ResultsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService
  ) {}

  moneda: string = 'PEN';
  duracion = 0;
  duracionModificada = 0;
  convexidad = 0;
  tcea = 0;
  trea = 0;
  precioMaximo = 0;
  columnas = ['n', 'tea', 'tes', 'gracia', 'saldoInicial', 'interes', 'cuota', 'amortizacion', 'saldoFinal'];
  datos: any[] = [];

  ngOnInit(): void {
    const bondId = Number(this.route.snapshot.paramMap.get('id'));

    this.resultService.getResultByBondId(bondId).subscribe({
      next: (result) => {
        this.duracion = result.duration;
        this.duracionModificada = result.durationMod;
        this.convexidad = result.convexity;
        this.tcea = result.tcea;
        this.trea = result.trea;
        this.precioMaximo = result.maxMarketPrice;

        this.datos = result.periods.map((p: any) => ({
          n: p.number,
          tea: p.tea,
          tes: p.tes,
          gracia: p.gracia,
          saldoInicial: p.saldoInicial,
          interes: p.interes,
          cuota: p.cuota,
          amortizacion: p.amortizacion,
          saldoFinal: p.saldoFinal
        }));
      },
      error: () => {
        alert("No se pudo cargar el resultado.");
      }
    });
  }
}
