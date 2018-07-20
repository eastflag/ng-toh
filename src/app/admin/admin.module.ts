import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ManageHeroComponent } from './manage-hero/manage-hero.component';
import {RouterModule, Routes} from '@angular/router';
import { RegisterHeroComponent } from './register-hero/register-hero.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AdminService} from './admin.service';
import {ManageDialogComponent} from './manage-hero/manage-dialog.component';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: '', component: IndexComponent, children: [
      {path: '', component: DashboardComponent},
      {path: 'register', component: RegisterHeroComponent},
      {path: 'manage', component: ManageHeroComponent}
    ]}
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
  ],
  declarations: [IndexComponent, ManageHeroComponent, RegisterHeroComponent, DashboardComponent, ManageDialogComponent],
  providers: [AdminService],
  entryComponents: [ManageDialogComponent]
})
export class AdminModule { }
