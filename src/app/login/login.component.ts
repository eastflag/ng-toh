import { Component, OnInit } from '@angular/core';
import {MemberVo} from '../domain/member.vo';
import {AuthGuardService} from '../auth-guard.service';
import {Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  member = new MemberVo();

  constructor(private authService: AuthGuardService, private router: Router, private toaster: ToasterService) {
    this.member.email = 'admin@eastflag.co.kr';
    this.member.password = '123456';
  }

  ngOnInit() {
  }

  login() {
    console.log('login');
    this.authService.login(this.member)
      .subscribe(result => {
        if (result) {
          this.toaster.pop('success', 'success', '로그인하였습니다.');
        } else {
          this.toaster.pop('fail', 'fail', '로그인에 실패하였습니다.!!!');
        }
      });
  }
}
