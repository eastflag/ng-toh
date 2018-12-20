import { Component, OnInit } from '@angular/core';
import {MemberVo} from '../domain/member.vo';
import {AuthGuardService} from '../auth-guard.service';
import {Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  member = new MemberVo();

  constructor(private router: Router, private toaster: ToasterService, private heroService: HeroService) {
    this.member.email = 'admin@eastflag.co.kr';
    this.member.password = '123456';
  }

  ngOnInit() {
  }

  login() {
    console.log('login');
    this.heroService.login(this.member)
      .subscribe(body => {
        console.log(body);
        if (body.result === 0) {
          localStorage.setItem('token', body.data['token']);
          //
          if (localStorage.getItem('redirect_url')) {
            this.router.navigateByUrl(localStorage.getItem('redirect_url'));
          } else {
            this.router.navigateByUrl('/');
          }

          this.toaster.pop('success', 'success', '로그인하였습니다.');
        } else {
          this.toaster.pop('fail', 'fail', '로그인에 실패하였습니다.!!!');
        }
      });
  }
}
