import { Component, OnInit } from '@angular/core';
import {Hero} from '../../hero';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {ToasterService} from 'angular2-toaster';
import {environment} from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../../hero.service';

@Component({
  selector: 'app-correct-hero',
  templateUrl: './correct-hero.component.html',
  styleUrls: ['./correct-hero.component.scss']
})
export class CorrectHeroComponent implements OnInit {
  form: FormGroup;
  powers = ['flying', 'penetration', 'hacking', 'strength'];

  constructor(private fb: FormBuilder, private adminService: AdminService, private toaster: ToasterService,
              private route: ActivatedRoute, private heroService: HeroService) {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      sex: [null, Validators.required],
      country: [null, Validators.required],
      address: null,
      power: this.fb.array(this.powers.map(x => !1)),
      photo: null
    });
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        console.log(params);
        this.getHero(+params['hero_id']);
      });
  }

  getHero(id: number) {
    this.heroService.getHero(id)
      .subscribe(hero => {
        // power에 A, B 를 [A, B]로 변환후 [true, false, true, false] 로 변환해야 한다.
        let powerlist = hero.power.split(',');
        let result = this.powers.map(item => (powerlist.indexOf(item) > -1) ? true : false);

        // hero에 있는 hero_id가 매핑이 안된다.
        // this.form.setValue(hero);
        delete hero.power;
        this.form.patchValue(hero);

        this.form.patchValue({power: result});
      });
  }

  modify() {
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

  fileUpload(event: any) {
    console.log(event);

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      const formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name);
      this.adminService.imageUpload(formData)
        .subscribe(body => {
          console.log(body);
          let image = body['value'];
          if (!environment.production) {
            image = 'http://www.javabrain.kr:3000' + image;
          }
          this.form.controls['photo'].setValue(image);
        });
    };
  }
}
