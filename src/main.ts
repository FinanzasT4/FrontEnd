import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent} from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule} from './app/app-routing.module';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      RouterModule,
      AppRoutingModule,
      MatNativeDateModule
    ),
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
  ],
}).catch(err => console.error(err));
