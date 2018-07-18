import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-register-hero',
  templateUrl: './register-hero.component.html',
  styleUrls: ['./register-hero.component.scss']
})
export class RegisterHeroComponent implements OnInit {
  form: FormGroup;
  powers = ['flying', 'penetration', 'hacking', 'strength'];

  constructor(private fb: FormBuilder, private adminService: AdminService, private toaster: ToasterService) {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      sex: [null, Validators.required],
      country: [null, Validators.required],
      address: null,
      power: this.fb.array(this.powers.map(x => !1))
    });
  }

  ngOnInit() {
  }

  register() {
    console.log('register');
    if (!this.form.valid) {
      // to validate all form fields
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.controls[key];
        control.markAsTouched({onlySelf: true});
      });
      return;
    }

    const power = this.form.controls['power'].value
      .map((item, index) => item ? this.powers[index] : false)
      .filter(item => item ? true : false);
    console.log(power);

    const sendForm = Object.assign({}, this.form.value);
    // DB에는 스트링 배열 타입이 아니라 콤마로 분리된 스트링으로 넣어야 한다.
    sendForm.power = power.toString();

    console.log(sendForm);

    this.adminService.addHero(sendForm)
      .subscribe(body => {
        console.log(body);
        this.toaster.pop('success', 'success', '등록되었습니다!');
        // form 초기화
        this.form.reset({});
      });
  }
}
