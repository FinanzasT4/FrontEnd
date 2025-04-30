import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  moneda: 'PEN' | 'USD' = 'PEN';
  tipoTasa: 'Efectiva' | 'Nominal' = 'Efectiva';
  capitalizacion: 'Diaria' | 'Quincenal' | 'Mensual' | 'Bimestral' | 'Trimestral' | 'Cuatrimestral' | 'Semestral' | 'Anual' = 'Mensual';
  frecuencia: 'Diaria' | 'Quincenal' | 'Mensual' | 'Bimestral' | 'Trimestral' | 'Cuatrimestral' | 'Semestral' | 'Anual' = 'Mensual';
  tipoGracia: 'T' | 'P' | 'N' = 'N';

  setConfig(config: Partial<ConfigurationService>) {
    Object.assign(this, config);
  }

  getConfig() {
    return {
      moneda: this.moneda,
      tipoTasa: this.tipoTasa,
      capitalizacion: this.capitalizacion,
      frecuencia: this.frecuencia,
      tipoGracia: this.tipoGracia
    };
  }
constructor() { }
}
