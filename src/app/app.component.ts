import { Component } from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';
import {AuthGuardService} from './auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      timeout: 2000
    });

  constructor(public authService: AuthGuardService) {}
}
