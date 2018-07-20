import { Component, OnInit } from '@angular/core';
import {HeroService} from '../../hero.service';
import {Hero} from '../../hero';

@Component({
  selector: 'app-manage-hero',
  templateUrl: './manage-hero.component.html',
  styleUrls: ['./manage-hero.component.scss']
})
export class ManageHeroComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes()
      .subscribe(data => {
        this.heroes = data;
        console.log(this.heroes);
      });
  }
}
