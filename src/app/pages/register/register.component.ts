import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, SharedModule],
  template: `
    <div class="register-container">
      <mat-card>
        <mat-card-title class="card-title">Registro de Usuario</mat-card-title>
        <mat-card-content>
          <form (ngSubmit)="register()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Usuario</mat-label>
              <input matInput [(ngModel)]="username" name="username" required />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input matInput type="password" [(ngModel)]="password" name="password" required />
            </mat-form-field>

            <div class="actions">
              <button mat-flat-button color="primary" type="submit">Registrarse</button>
              <button mat-stroked-button color="accent" type="button" (click)="goToLogin()">Volver al Login</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f7f9fc;
    }

    mat-card {
      width: 28rem;
      padding: 2rem;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .card-title {
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 1rem;
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
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const userData = {
      username: this.username,
      password: this.password,
      roles: ['ROLE_USER']
    };

    this.authService.signUp(userData).subscribe({
      next: () => {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Error al registrar usuario. Verifica que el usuario no exista.');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
