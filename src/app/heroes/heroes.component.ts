import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  // hero: Hero = {
  //   hero_id: 1,
  //   name: 'Windstorm'
  // };

  heroes: Hero[];

  selectedHero: Hero;

  isSpecial = true;

  constructor(private heroService: HeroService, private router: Router) {
    // subscriber: 자식컴포넌트가 변경됨을 감지
    this.heroService.refresh$.subscribe(data => {
      console.log(data);
      this.selectedHero = this.heroes.find(item => item.hero_id === data ? true : false);
    });


    // 부모 목록으로 되돌아 올때 감지가 안되므로 추가
    this.router.events.subscribe(events => {
      // 부모, 자식 경로가 호출될때마다 여러가지 이벤트 발생. NavigationStart -> NavigationReconized -> NavigationEnd
      if (events instanceof NavigationStart) {
        console.log('nagigation start:' + events.url);
        if (events.url === '/heroes') {
          this.selectedHero = null;
        }
      }
    });
  }

  ngOnInit() {
    this.heroService.getHeroes()
      .subscribe(data => {
        this.heroes = data;
        console.log(this.heroes);
      });
  }

  onSave(event: any) {
    console.log(event);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
