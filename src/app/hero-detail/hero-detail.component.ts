import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input()
  selectedHero: Hero;

  constructor(private route: ActivatedRoute) {
    this.route.params
      .subscribe(params => {
        console.log(params);
      });
  }

  ngOnInit() {
  }

}
