import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private service:HttpClient) { }

  private APIUrl: string ;
  private loginurl:string = 'https://backendvercel-brown.vercel.app/'


  async Login(UserName: string,Password:string) {
    this.APIUrl = this.loginurl+'login?UserName='+UserName+'&Password='+Password;
    let resp = await this.service.get(this.APIUrl).toPromise();
    return resp;
  }
}
