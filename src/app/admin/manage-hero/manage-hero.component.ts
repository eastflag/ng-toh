import { Component, OnInit } from '@angular/core';
import {HeroService} from '../../hero.service';
import {Hero} from '../../hero';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ManageDialogComponent} from './manage-dialog.component';

@Component({
  selector: 'app-manage-hero',
  templateUrl: './manage-hero.component.html',
  styleUrls: ['./manage-hero.component.scss']
})
export class ManageHeroComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService, private modalService: NgbModal) { }

  ngOnInit() {
    this.heroService.getHeroes()
      .subscribe(data => {
        this.heroes = data;
        console.log(this.heroes);
      });
  }

  confirmDelete(hero: Hero) {
    const dialogRef = this.modalService.open(ManageDialogComponent);
    dialogRef.componentInstance.name = hero.name;
  }
}
