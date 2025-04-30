import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResultService {
  private apiUrl = 'http://localhost:8080/api/v1/results';

  constructor(private http: HttpClient) {}

  getAllResults(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getResultById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteResult(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getResultByBondId(bondId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/by-bond/${bondId}`);
  }
}
