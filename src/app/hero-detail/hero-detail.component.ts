import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  // @Input()
  selectedHero: Hero;
  powers = {
    flying: false,
    penetration: false,
    hacking: false,
    strength: false
  };

  constructor(private route: ActivatedRoute, private heroService: HeroService) {
    this.route.params
      .subscribe(params => {
        console.log(params);
        this.getHero(+params['hero_id']);
        // 변경된 데이터를 부모에게 전달
        this.heroService.refresh.next(+params['hero_id']);
      });
  }

  getHero(id: number) {
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.selectedHero = hero;
        let powerList: string[] = this.selectedHero.power.split(',');
        let powerObject = {};
        powerList.forEach(item => powerObject[item] = true);
        console.log(powerList, powerObject);

        Object.assign(this.powers, powerObject);
        console.log(this.powers);
      });
  }

  ngOnInit() {
  }

  goBack() {
    history.back();
  }
}
