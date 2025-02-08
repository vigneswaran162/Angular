import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private service:HttpClient,private router:Router) { }

  private APIUrl: string ;
  private loginurl:string = 'https://backendvercel-brown.vercel.app/'


  async Login(UserName: string,Password:string) {
    this.APIUrl = this.loginurl+'login?UserName='+UserName+'&Password='+Password;
    let resp = await this.service.get(this.APIUrl).toPromise();
    return resp;
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate([''])
  }

  getuserdata() {
    const userData = localStorage.getItem("currentUser");
    return userData ? JSON.parse(userData) : null;
}


  getToken(): string | null {
    
      return localStorage.getItem('currentUser');
    
  }

  isLoggedIn(): boolean {
    return  !!this.getToken();
  }
}
