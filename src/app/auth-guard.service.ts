import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {MemberVo} from './domain/member.vo';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  isLogIn() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    // jwt 토큰 유효성 검증
    let base64Url = token.split('.')[1]; // head + payload + signature
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    const payload = JSON.parse(window.atob(base64));
    console.log(payload);

    if (payload.exp - new Date().getTime() / 1000 > 0 ) {
      return true;
    } else {
      return false;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return undefined;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return undefined;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    let url = `/${route.path}`;
    console.log(url);
    if (this.isLogIn()) {
      return true;
    } else {
      localStorage.setItem('redirect_url', url);
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
