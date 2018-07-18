import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      sex: null,
      country: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      power: this.fb.array(this.powers.map(x => !1))
    });
  }

  ngOnInit() {
  }

  register() {
    const power = this.form.controls['power'].value.map((item, index) => {
      if (item) {
        return this.powers[index];
      }
    }).filter(item => item ? true : false);
    console.log(power);
  }
}
