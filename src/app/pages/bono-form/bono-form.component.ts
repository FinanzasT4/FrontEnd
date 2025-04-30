import {Component, OnDestroy, OnInit} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {Router, ActivatedRoute } from '@angular/router';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {BondService} from '../../services/bond.service';
import {BondFormStateService} from '../../services/bond-form-state.service';
import {ConfigurationService} from '../../services/configuration.service';

@Component({
  selector: 'app-bono-form',
  imports: [
    SharedModule,
    NavbarComponent,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="container">
      <mat-card class="full-width-exterior">
        <mat-card-title class="full-width-exterior-title">Datos del Bono</mat-card-title>
        <mat-card-content>
          <form (ngSubmit)="Calculate()">
            <mat-card class="full-width-interior">
              <mat-card-title class="full-width-interior-title">Ingrese los siguientes valores:</mat-card-title>
              <mat-card-content>
                <div class="form-grid">

                  <mat-form-field appearance="outline">
                    <mat-label>Nombre del Bono</mat-label>
                    <input matInput name="nombre" [(ngModel)]="nombre" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Valor Nominal</mat-label>
                    <input matInput type="number" [(ngModel)]="valorNominal" name="valorNominal" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Precio de Emisión</mat-label>
                    <input matInput type="number" [(ngModel)]="precioEmision" name="precioEmision" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Precio de Compra</mat-label>
                    <input matInput type="number" [(ngModel)]="precioCompra" name="precioCompra" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Fecha de Emisión</mat-label>
                    <input matInput [matDatepicker]="picker1" [(ngModel)]="fechaEmision" name="fechaEmision">
                    <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
                    <mat-datepicker #picker1></mat-datepicker>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Fecha de Vencimiento</mat-label>
                    <input matInput [matDatepicker]="picker2" [(ngModel)]="fechaVencimiento" name="fechaVencimiento">
                    <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
                    <mat-datepicker #picker2></mat-datepicker>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Número de Periodos</mat-label>
                    <input matInput type="number" [(ngModel)]="periodos" name="periodos">
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Tasa (%)</mat-label>
                    <input matInput type="number" [(ngModel)]="valorTasa" name="valorTasa">
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Tasa del Mercado (%)</mat-label>
                    <input matInput type="number" [(ngModel)]="tasaMercado" name="tasaMercado">
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Plazo de Gracia Capital</mat-label>
                    <input matInput type="number" [(ngModel)]="graciaCapital" name="graciaCapital">
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Plazo de Gracia Interés</mat-label>
                    <input matInput type="number" [(ngModel)]="graciaInteres" name="graciaInteres">
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Comisión (%)</mat-label>
                    <input matInput type="number" [(ngModel)]="comision" name="comision">
                  </mat-form-field>

                </div>
              </mat-card-content>

              <mat-card-actions>
                <button mat-flat-button color="primary" type="submit">Calcular Flujo</button>
              </mat-card-actions>
            </mat-card>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
    .container {
      display: flex;
      justify-content: center;

      .full-width-exterior-title{
        display: flex;
        justify-content: center;
        padding-top: 1rem;
      }

      .full-width-interior-title{
        padding: 1.5rem;
      }

      mat-card {
        width: 100%;
      }

      .full-width-exterior {
        width: 100%;
        margin-bottom: 2rem;
      }
    }
  `
})
export class BonoFormComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bondService: BondService,
    private formState: BondFormStateService,
    private configService: ConfigurationService
  ) {}


  // Datos principales del bono
  bondId: number | null = null;
  nombre: string = '';
  valorNominal: number = 0;
  precioEmision: number = 0;
  precioCompra: number = 0;
  fechaEmision: Date = new Date();
  fechaVencimiento: Date = new Date();
  periodos: number = 0;

  // Tasas
  valorTasa: number = 0;
  tasaMercado: number = 0;

  // Plazos de gracia
  graciaCapital: number = 0;
  graciaInteres: number = 0;

  // Comisión
  comision: number = 0;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.formState.bondFormData && !id) {
      Object.assign(this, this.formState.bondFormData);

      // 🔄 Sincroniza también la config si venías del tab de configuración
      this.configService.setConfig({
        moneda: this.configService.getConfig().moneda,
        tipoTasa: this.formState.bondFormData.rateType,
        capitalizacion: this.formState.bondFormData.capitalization,
        frecuencia: this.formState.bondFormData.frequency,
        tipoGracia: this.formState.bondFormData.graceType
      });
    }

    if (id) {
      this.bondId = +id;
      this.bondService.getBondById(this.bondId).subscribe(bond => {
        Object.assign(this, {
          nombre: bond.bondName,
          valorNominal: bond.faceValue,
          precioEmision: bond.issuePrice,
          precioCompra: bond.purchasePrice,
          fechaEmision: new Date(bond.issueDate),
          fechaVencimiento: new Date(bond.maturityDate),
          periodos: bond.totalPeriods,
          tipoTasa: bond.rateType,
          valorTasa: bond.rateValue,
          capitalizacion: bond.capitalization,
          frecuencia: bond.frequency,
          tipoGracia: bond.graceType,
          graciaCapital: bond.graceCapital,
          graciaInteres: bond.graceInterest,
          comision: bond.commission,
          tasaMercado: bond.marketRate,
        });
      });
    }
    console.log('Valor Tasa restaurado:', this.valorTasa);
  }

  ngOnDestroy(): void {

    const config = this.configService.getConfig();

    this.formState.bondFormData = {
      nombre: this.nombre,
      valorNominal: this.valorNominal,
      precioEmision: this.precioEmision,
      precioCompra: this.precioCompra,
      fechaEmision: this.fechaEmision,
      fechaVencimiento: this.fechaVencimiento,
      periodos: this.periodos,
      rateType: config.tipoTasa.toUpperCase(),
      rateValue: this.valorTasa,
      capitalization: config.capitalizacion.toLowerCase(),
      frequency: config.frecuencia.toLowerCase(),
      graceType: config.tipoGracia,
      graciaCapital: this.graciaCapital,
      graciaInteres: this.graciaInteres,
      comision: this.comision,
      tasaMercado: this.tasaMercado
    };
  }


  validateFields(): boolean {
    if (!this.nombre.trim()) {
      alert('El campo "Nombre del Bono" es obligatorio.');
      return false;
    }
    if (this.valorNominal <= 0) {
      alert('El campo "Valor Nominal" debe ser mayor a 0.');
      return false;
    }
    if (this.precioEmision <= 0) {
      alert('El campo "Precio de Emisión" debe ser mayor a 0.');
      return false;
    }
    if (this.precioCompra <= 0) {
      alert('El campo "Precio de Compra" debe ser mayor a 0.');
      return false;
    }
    if (!this.fechaEmision || !this.fechaVencimiento || this.fechaEmision >= this.fechaVencimiento) {
      alert('La "Fecha de Emisión" debe ser anterior a la "Fecha de Vencimiento".');
      return false;
    }
    if (this.periodos <= 0) {
      alert('El campo "Número de Periodos" debe ser mayor a 0.');
      return false;
    }
    if (this.valorTasa <= 0) {
      alert('La "Tasa (%)" debe ser mayor a 0.');
      return false;
    }
    if (this.tasaMercado <= 0) {
      alert('La "Tasa del Mercado (%)" debe ser mayor a 0.');
      return false;
    }
    if (this.graciaCapital < 0 || this.graciaInteres < 0) {
      alert('Los plazos de gracia no pueden ser negativos.');
      return false;
    }
    if (this.comision < 0 || this.comision > 100) {
      alert('La "Comisión (%)" debe estar entre 0 y 100.');
      return false;
    }
    return true;
  }

  Calculate() {
    if (!this.validateFields()) return;

    const config = this.configService.getConfig();

    const bondPayload = {
      bondName: this.nombre,
      faceValue: this.valorNominal,
      issuePrice: this.precioEmision,
      purchasePrice: this.precioCompra,
      issueDate: this.fechaEmision,
      maturityDate: this.fechaVencimiento,
      totalPeriods: this.periodos,
      rateType: config.tipoTasa.toUpperCase(),
      rateValue: this.valorTasa,
      capitalization: config.capitalizacion.toLowerCase(),
      frequency: config.frecuencia.toLowerCase(),
      graceType: config.tipoGracia,
      graceCapital: this.graciaCapital,
      graceInterest: this.graciaInteres,
      commission: this.comision,
      marketRate: this.tasaMercado,
      userId: Number(localStorage.getItem('userId'))
    };


    this.bondService.createBond(bondPayload).subscribe({
      next: (res: any) => {
        console.log('Bond created:', res);
        this.router.navigate(['/results', res.id]); // asegúrate de que esa ruta esté en tu router
      },
      error: (err: any) => {
        console.error('Error al crear el bono', err);
      }
    });
    console.log('Enviando valorTasa:', this.valorTasa);
  }
}
