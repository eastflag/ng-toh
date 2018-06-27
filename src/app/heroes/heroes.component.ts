import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

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

  constructor(private heroService: HeroService) { }

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
