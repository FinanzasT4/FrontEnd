import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [SharedModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <mat-card>
      <mat-card-title>Configuración del Sistema</mat-card-title>
      <mat-card-content>

        <mat-form-field appearance="fill">
          <mat-label>Moneda</mat-label>
          <mat-select [(ngModel)]="moneda" name="moneda">
            <mat-option value="PEN">Soles (PEN)</mat-option>
            <mat-option value="USD">Dólares (USD)</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Tipo de Tasa</mat-label>
          <mat-select [(ngModel)]="tipoTasa" name="tipoTasa">
            <mat-option value="Efectiva">Efectiva</mat-option>
            <mat-option value="Nominal">Nominal</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field *ngIf="tipoTasa === 'Nominal'" appearance="fill">
          <mat-label>Capitalización</mat-label>
          <mat-select [(ngModel)]="capitalizacion" name="capitalizacion">
            <mat-option value="Mensual">Mensual</mat-option>
            <mat-option value="Trimestral">Trimestral</mat-option>
            <mat-option value="Semestral">Semestral</mat-option>
            <mat-option value="Anual">Anual</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Frecuencia de Pagos</mat-label>
          <mat-select [(ngModel)]="frecuencia" name="frecuencia">
            <mat-option value="Mensual">Mensual</mat-option>
            <mat-option value="Trimestral">Trimestral</mat-option>
            <mat-option value="Semestral">Semestral</mat-option>
            <mat-option value="Anual">Anual</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Tipo de Plazo de Gracia</mat-label>
          <mat-select [(ngModel)]="tipoGracia" name="tipoGracia">
            <mat-option value="T">Total</mat-option>
            <mat-option value="P">Parcial</mat-option>
            <mat-option value="N">Ninguno</mat-option>
          </mat-select>
        </mat-form-field>
      </mat-card-content>
    </mat-card>
  `
})
export class ConfigurationComponent implements OnInit, OnDestroy {
  moneda!: 'PEN' | 'USD';
  tipoTasa!: 'Efectiva' | 'Nominal';
  capitalizacion!: "Diaria" | "Quincenal" | "Mensual" | "Bimestral" | "Trimestral" | "Cuatrimestral" | "Semestral" | "Anual";
  frecuencia!: "Diaria" | "Quincenal" | "Mensual" | "Bimestral" | "Trimestral" | "Cuatrimestral" | "Semestral" | "Anual";
  tipoGracia!: 'T' | 'P' | 'N';

  constructor(private configService: ConfigurationService) {}

  ngOnInit(): void {
    const config = this.configService.getConfig();
    this.moneda = config.moneda;
    this.tipoTasa = config.tipoTasa;
    this.capitalizacion = config.capitalizacion;
    this.frecuencia = config.frecuencia;
    this.tipoGracia = config.tipoGracia;
  }

  ngOnDestroy(): void {
    this.configService.setConfig({
      moneda: this.moneda,
      tipoTasa: this.tipoTasa,
      capitalizacion: this.capitalizacion,
      frecuencia: this.frecuencia,
      tipoGracia: this.tipoGracia
    });
  }
}
