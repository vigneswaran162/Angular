import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { BookingEditComponent } from './booking-edit/booking-edit.component';

const routes: Routes = [
  {
    path:'DashBoard',
    component:DashBoardComponent
  },
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'BoookingPracel',
    component:BookingEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
