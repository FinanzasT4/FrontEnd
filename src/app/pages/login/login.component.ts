import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, SharedModule],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-title class="card-title">Bienvenido</mat-card-title>
        <mat-card-subtitle class="card-subtitle">Inicia sesión para continuar</mat-card-subtitle>
        <mat-card-content>
          <form (ngSubmit)="login()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Usuario</mat-label>
              <input matInput [(ngModel)]="username" name="username" required />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input matInput type="password" [(ngModel)]="password" name="password" required />
            </mat-form-field>

            <div class="actions">
              <button mat-flat-button color="primary" type="submit">Ingresar</button>
              <button mat-stroked-button color="accent" type="button" routerLink="/register">Registrarse</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f4f6f9;
    }

    mat-card {
      width: 28rem;
      padding: 2rem;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .card-title {
      font-size: 1.5rem;
      text-align: center;
    }

    .card-subtitle {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #6b6b6b;
    }

    .full-width {
      width: 100%;
      margin-bottom: 1.25rem;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.authService.signIn({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);
        this.router.navigate(['/bond']);
      },
      error: () => {
        alert('Credenciales inválidas');
      }
    });
  }
}
