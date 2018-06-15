import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  heroes = HEROES;

  selectedHero: Hero;

  isSpecial = true;

  constructor() { }

  ngOnInit() {
  }


  onSave(event: any) {
    console.log(event);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
