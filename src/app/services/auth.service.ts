import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/authentication';

  constructor(private http: HttpClient) {}

  signIn(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-in`, credentials);
  }

  signUp(data: { username: string; password: string; roles: string[] }) {
    return this.http.post<any>('http://localhost:8080/api/v1/authentication/sign-up', data);
  }

}
