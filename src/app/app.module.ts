import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      RouterModule,
      AppRoutingModule,
      MatNativeDateModule
    ),
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
  ],
}).catch(err => console.error(err));
