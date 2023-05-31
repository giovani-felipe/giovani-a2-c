import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';
import { provideHttpClient } from '@angular/common/http';
import { BodyComponent } from './app/shell/body/body.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [BodyComponent],
  template: '<app-body></app-body>',
})
export class App {}

bootstrapApplication(App, {
  providers: [provideHttpClient(), provideRouter(routes)],
});
