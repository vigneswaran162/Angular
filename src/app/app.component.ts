import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webapp';


  isSidenavOpen= false;
  isLoggedIn: boolean = false; 
  user:any
  menuItems = [
    { icon: 'fa-chart-line', label: 'Pracel', route: '/DashBoard' },
    { icon: 'fa-truck', label: 'Book Pracel', route: '/BoookingPracel' },
    { icon: 'fa-truck-ramp-box', label: 'Manage Pracel', route: '/ManagePracel' },
    { icon: 'fa-table', label: 'Report', route: '/Report' },


  ];



constructor (public service:LoginService){
}

async ngOnInit() {
   let resp = await this.service.isLoggedIn()
  
}


  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen; 
  }


  logout(){
    this.service.logout()
    this.isLoggedIn = this.service.isLoggedIn(); 
  }
}
