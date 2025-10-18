import { bootstrapApplication } from '@angular/platform-browser';
import { HomePage } from './app/home/home.page';
import { provideIonicAngular } from '@ionic/angular/standalone';

bootstrapApplication(HomePage, {
  providers: [provideIonicAngular()],
});