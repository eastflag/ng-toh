import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

@Component({
  selector: 'app-register-hero',
  templateUrl: './register-hero.component.html',
  styleUrls: ['./register-hero.component.scss']
})
export class RegisterHeroComponent implements OnInit {
  form: FormGroup;
  powers = ['flying', 'penetration', 'hacking', 'strength'];

  constructor(private fb: FormBuilder) {
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

    const power = this.form.controls['power'].value.map((item, index) => {
      if (item) {
        return this.powers[index];
      }
    }).filter(item => item ? true : false);
    console.log(power);
  }
}
