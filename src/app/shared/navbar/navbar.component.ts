import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../shared.module';
import { BondFormStateService } from '../../services/bond-form-state.service';

@Component({
  selector: 'app-navbar',
  imports: [
    SharedModule
  ],
  template: `
    <div class="menu">
    <a (click)="GoToBond()" class="link">
  <span class="link-icon">
  <svg
    xmlns="http://www.w3.org/2000/svg"
  width="192"
  height="192"
  fill="currentColor"
  viewBox="0 0 256 256"
  >
  <path
    d="M48,40H208a8,8,0,0,1,8,8V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48A8,8,0,0,1,48,40ZM80,72a8,8,0,1,0,8,8A8,8,0,0,0,80,72Zm48,0a8,8,0,1,0,8,8A8,8,0,0,0,128,72Zm48,0a8,8,0,1,0,8,8A8,8,0,0,0,176,72ZM80,120a8,8,0,1,0,8,8A8,8,0,0,0,80,120Zm48,0a8,8,0,1,0,8,8A8,8,0,0,0,128,120Zm48,0a8,8,0,1,0,8,8A8,8,0,0,0,176,120ZM80,168H176a8,8,0,0,0,0-16H80a8,8,0,0,0,0,16Z"
  fill="none"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="16"
    ></path>
    </svg>
    </span>
    <span class="link-title">Calculadora</span>
  </a>
  <a (click)="GoToRecord()" class="link">
  <span class="link-icon">
  <svg
    xmlns="http://www.w3.org/2000/svg"
  width="192"
  height="192"
  fill="currentColor"
  viewBox="0 0 256 256"
  >
  <path
    d="M128,24A104,104,0,1,1,24,128,104.11791,104.11791,0,0,1,128,24Zm0,192a88,88,0,1,0-88-88A88.09957,88.09957,0,0,0,128,216Zm8-96V72a8,8,0,0,0-16,0v56a8.00039,8.00039,0,0,0,4.68652,7.31445l40,16a8,8,0,1,0,6.627-14.62891Z"
  fill="none"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="16"
    ></path>
    </svg>
    </span>
    <span class="link-title">Historial</span>
  </a>
  <a (click)="GoToConfiguration()" class="link">
  <span class="link-icon-1">
  <svg
    xmlns="http://www.w3.org/2000/svg"
  width="500"
  height="500"
  fill="currentColor"
  viewBox="0 0 256 256"
  >
  <path
    d="M 82 51 l 2 -5 l 8.4 -6.6 c 0.7 -0.5 0.9 -1.5 0.6 -2.4 l -8 -13.8 c -0.4 -0.7 -1.3 -1 -2.1 -0.7 l -9.9 4 c -2.4 -1.8 -5 -3.3 -7.8 -4.5 l -1.5 -10.6 c -0.1 -0.8 -0.8 -1.4 -1.6 -1.4 H 42.5 c -0.8 0 -1.5 0.6 -1.6 1.4 l -1.5 10.6 c -2.8 1.2 -5.4 2.7 -7.8 4.5 l -9.9 -4 c -0.8 -0.3 -1.7 0 -2.1 0.7 l -8 13.8 c -0.4 0.7 -0.2 1.6 0.4 2.2 l 8.4 6.6 c -0.2 1.5 -0.4 3 -0.4 4.4 s 0.1 2.9 0.4 4.4 l -8.4 6.6 c -0.7 0.5 -0.9 1.5 -0.4 2.2 l 8 13.8 c 0.4 0.7 1.3 1 2.1 0.7 l 9.9 -4 c 2.4 1.8 5 3.3 7.8 4.5 l 1.5 10.6 c 0.1 0.8 0.8 1.4 1.6 1.4 h 15.9 c 0.8 0 1.5 -0.6 1.6 -1.4 l 1.5 -10.6 c 2.8 -1.2 5.4 -2.7 7.8 -4.5 l 9.9 4 c 0.8 0.3 1.7 0 2.1 -0.7 l 8 -13.8 c 0.4 -0.7 0.2 -1.6 -0.4 -2.2 L 80 57 z M 50 65 c -8.3 0 -15 -6.7 -15 -15 s 6.7 -15 15 -15 s 15 6.7 15 15 S 58.3 65 50 65 z"
  fill="none"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="5"
    ></path>
    </svg>
    </span>
    <span class="link-title">Configuracion</span>
  </a>

  <a (click)="Logout()" class="link">
  <span class="link-icon">
  <svg
    xmlns="http://www.w3.org/2000/svg"
  width="192"
  height="192"
  fill="currentColor"
  viewBox="0 0 256 256"
  >
  <rect width="256" height="256" fill="none"></rect>
  <path
  fill="none"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="16"
    ></path>
    <rect x="48" y="30" width="160" height="200" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round" />
  <circle cx="170" cy="140" r="20" fill="currentColor" />
  </svg>
  </span>
  <span class="link-title">Salir</span>
  </a>

  </div>
    `,
  styles:  `
  /* From Uiverse.io by Admin12121 */
  .menu {
  padding: 1rem;
  background-color: #fff;
position: relative;
display: flex;
justify-content: right;
border-radius: 15px;
}

.link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transform-origin: center left;
  transition: width 0.2s ease-in;
  text-decoration: none;
  color: inherit;
&:before {
    position: absolute;
    z-index: -1;
    content: "";
    display: block;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    top: 0;
    transform: translateX(100%);
    transition: transform 0.5s ease-in;
    transform-origin: center right;
    background-color: #eee;
  }

&:hover,
&:focus {
    outline: 0;
    width: 13rem;
    cursor: pointer;

  &:before,
  .link-title {
      transform: translateX(0);
      opacity: 1;
    }
  }
}

.link-icon {
  width: 28px;
  height: 5rem;
  display: block;
  flex-shrink: 0;
  left: 1rem;
  position: absolute;
  svg {
    width: 100%;
    height: 100%;
  }
}

.link-icon-1 {
  width: 5rem;
  height: 10rem;
  display: block;
  flex-shrink: 0;
  padding-top: 3rem;
  left: 1rem;
  position: absolute;
  svg {
    width: 100%;
    height: 100%;
  }
}

.link-title {
  transform: translateX(100%);
  transition: transform 0.2s ease-in;
  transform-origin: center right;
  display: block;
  text-align: center;
  text-indent: 1rem;
  width: 100%;
}
  `
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private bondFormState: BondFormStateService
  ) {}

  private persistBondFormIfNeeded() {
    const currentUrl = this.router.url;
    if (currentUrl.startsWith('/bond')) {
      const form = document.querySelector('form');
      if (form) {
        const formData = new FormData(form as HTMLFormElement);
        this.bondFormState.bondFormData = {
          nombre: formData.get('nombre')?.toString() || '',
          valorNominal: Number(formData.get('valorNominal')),
          precioEmision: Number(formData.get('precioEmision')),
          precioCompra: Number(formData.get('precioCompra')),
          fechaEmision: new Date(formData.get('fechaEmision')?.toString() || ''),
          fechaVencimiento: new Date(formData.get('fechaVencimiento')?.toString() || ''),
          periodos: Number(formData.get('periodos')),
          rateValue: Number(formData.get('valorTasa')),
          marketRate: Number(formData.get('tasaMercado')),
          graciaCapital: Number(formData.get('graciaCapital')),
          graciaInteres: Number(formData.get('graciaInteres')),
          comision: Number(formData.get('comision'))
        };
      }
    }
  }

  GoToConfiguration() {
    this.persistBondFormIfNeeded();
    this.router.navigate(['/configuration']);
  }

  GoToBond() {
    this.persistBondFormIfNeeded();
    this.router.navigate(['/bond']);
  }

  GoToRecord() {
    this.persistBondFormIfNeeded();
    this.router.navigate(['/records']);
  }

  Logout() {
    this.router.navigate(['/login']);
  }
}
