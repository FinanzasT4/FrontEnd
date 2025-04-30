import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BondService {
  private apiUrl = 'http://localhost:8080/api/v1/bonds';

  constructor(private http: HttpClient) {}

  createBond(bond: any): Observable<any> {
    return this.http.post(this.apiUrl, bond);
  }

  getBondsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteBond(bondId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bondId}`);
  }

  updateBond(bondId: number, bond: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bondId}`, bond);
  }

  getBondById(bondId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${bondId}`);
  }
}
