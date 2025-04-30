import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BondFormStateService {
  private readonly STORAGE_KEY = 'bondForm';

  private _bondFormData: any | null = null;

  get bondFormData(): any | null {
    if (this._bondFormData) return this._bondFormData;

    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing bond form from localStorage', e);
      }
    }
    return null;
  }

  set bondFormData(data: any | null) {
    this._bondFormData = data;
    if (data) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  clear() {
    this._bondFormData = null;
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
