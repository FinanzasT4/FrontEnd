import { Component } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [SharedModule],
  template: `
    <div class="not-found-container">
      <mat-card>
        <mat-card-title>Página no encontrada</mat-card-title>
        <mat-card-content>
          <p>Lo sentimos, la página que buscas no existe.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="checkSession()">Volver a la pagina</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: `
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
    }
    mat-card {
      padding: 2rem;
    }
  `,
})
export class NotFoundComponent {
    constructor(private router: Router) {
      this.checkSession();
    }

    checkSession() {
      const token = localStorage.getItem('token');
      if (token) {
        this.router.navigate(['/bond']);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
