import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import {FormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { VoterComponent } from './voter/voter.component';
import { VotetakerComponent } from './votetaker/votetaker.component';
import { TodoComponent } from './todo/todo.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { JqueryComponent } from './jquery/jquery.component';
import { MydatePipe } from './mydate.pipe';
import { HighlightDirective } from './highlight.directive';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'heroes', component: HeroesComponent, children: [
      {path: 'detail/:hero_id', component: HeroDetailComponent}
    ]},
  {path: 'jquery', component: JqueryComponent},
  {path: 'todo', component: TodoComponent},
  {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    VoterComponent,
    VotetakerComponent,
    TodoComponent,
    HomeComponent,
    JqueryComponent,
    MydatePipe,
    HighlightDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModalModule.forRoot(),
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
