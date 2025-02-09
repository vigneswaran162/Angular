import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { BookingEditComponent } from './booking-edit/booking-edit.component';
import { authGuard } from './services/auth.guard';
import { BookingListComponent } from './booking-list/booking-list.component';
import { ReportComponent } from './report/report.component';

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
    path:'BoookingPracel',
    component:BookingEditComponent,
    canActivate: [authGuard]

  },{
    path:'ManagePracel',
    component:BookingListComponent
  },{
    path:'Report',
    component:ReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
