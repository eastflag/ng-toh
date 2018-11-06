import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import {FormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
import {ToasterModule} from 'angular2-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ManageDialogComponent } from './admin/manage-hero/manage-dialog.component';
import { LoginComponent } from './login/login.component';
import {AuthGuardService} from './auth-guard.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {state: 'home'} },
  {path: 'heroes', component: HeroesComponent, data: {state: 'heroes'}, children: [
      {path: 'detail/:hero_id', component: HeroDetailComponent}
    ]},
  {path: 'jquery', component: JqueryComponent, data: {state: 'jquery'} },
  {path: 'todo', component: TodoComponent, data: {state: 'todo'} },
  {path: 'login', component: LoginComponent, data: {state: 'login'}},
  {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule', canLoad: [AuthGuardService]
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
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ToasterModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
