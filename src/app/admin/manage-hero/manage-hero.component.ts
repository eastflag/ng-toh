import { Component, OnInit } from '@angular/core';
import {HeroService} from '../../hero.service';
import {Hero} from '../../hero';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ManageDialogComponent} from './manage-dialog.component';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-manage-hero',
  templateUrl: './manage-hero.component.html',
  styleUrls: ['./manage-hero.component.scss']
})
export class ManageHeroComponent implements OnInit {
  heroes: Hero[];

  constructor(private adminService: AdminService, private heroService: HeroService, private modalService: NgbModal) { }

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
    dialogRef.result
      .then(data => {
        console.log(data);
        if (data) {
          this.adminService.removeHero(hero.hero_id)
            .subscribe(body => {
              console.log(body);
              const index = this.heroes.findIndex(item => item.hero_id === hero.hero_id ? true : false);
              this.heroes.splice(index, 1);
            });
        }
      });
  }
}
