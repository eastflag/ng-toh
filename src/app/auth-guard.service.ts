import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {MemberVo} from './domain/member.vo';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router) { }

  login(member: MemberVo): Observable<boolean> {
    if (member.email === 'admin@eastflag.co.kr' && member.password === '123456') {
      // http로 서버에 로그인이 성공하면 토큰 정보를 받아와서 스토리지에 저장한다.
      const token = 'abcdefg';
      localStorage.setItem('token', token);
      //
      if (localStorage.getItem('redirect_url')) {
        this.router.navigateByUrl(localStorage.getItem('redirect_url'));
      } else {
        this.router.navigateByUrl('/');
      }
      return of(true);
    } else {
      return of(false);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  isLogIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  checkLogin(url: string) {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      localStorage.setItem('redirect_url', url);
      this.router.navigateByUrl('login');
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
    return this.checkLogin(url);
  }
}
