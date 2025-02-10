import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { BookingEditComponent } from './booking-edit/booking-edit.component';
import { authGuard } from './services/auth.guard';
import { BookingListComponent } from './booking-list/booking-list.component';
import { ReportComponent } from './report/report.component';
import { NavabarComponent } from './navabar/navabar.component';
import { ManagePracelListComponent } from './manage-pracel-list/manage-pracel-list.component';

const routes: Routes = [
  {
    path:'DashBoard',
    component:DashBoardComponent,
    canActivate: [authGuard]

  },
  {
    path:'',
    component:LoginComponent
  },

  {
    path:'login',
  component:LoginComponent
  },
  {
    path:'BoookingPracel',
    component:BookingEditComponent,
    canActivate: [authGuard]

  },{
    path:'ManagePracel',
    component:ManagePracelListComponent,
    canActivate: [authGuard]
  },{
    path:'Report',
    component:ReportComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
