import { Component } from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';
import {AuthGuardService} from './auth-guard.service';
import {fadeAnimation} from './animations/fade-animation';
import {slideAnimation} from './animations/slide-animation';
import {routeAnimation} from './animations/route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation, slideAnimation, routeAnimation]
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

  getState(outlet: any) {
    return outlet.activatedRouteData['state'] || 'home';
  }
}
