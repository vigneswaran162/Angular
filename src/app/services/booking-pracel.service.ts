import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BookingPracelService {

  constructor(private service:HttpClient,private router:Router) { }

  private APIUrl: string ;
  private verclurl:string = 'https://backendvercel-brown.vercel.app/'



  private url:string = 'http://localhost:8000/'

  async GetArticelAll() {
    this.APIUrl = this.verclurl + 'GetArticle';
    let resp = await this.service.get(this.APIUrl).toPromise();
    return resp;
  }


  async GetAll() {
    this.APIUrl = this.verclurl + 'GetAll';
    let resp = await this.service.get(this.APIUrl).toPromise();
    return resp;
  }


  async GetBranchCode(BranchCode: string) {
    this.APIUrl = this.verclurl + 'GetBranchCode?BranchCode='+BranchCode;
    let resp = await this.service.get(this.APIUrl).toPromise();
    return resp;
  }
  async GetDocNo(){
    this.APIUrl = this.verclurl + 'GetDocNo';
    let resp = await this.service.get(this.APIUrl).toPromise();
    return resp;
  }

  async GetManageBooking(branchcode:string){
    this.APIUrl = this.verclurl + 'GetManagePracel?BrachCode='+branchcode;
    let resp = await this.service.get(this.APIUrl).toPromise();
    return resp;
  }

  async CRUD(entity: { OpsType: string; }) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    let options = {
      headers: headers,
    };
    if (entity.OpsType == 'S'){
      this.APIUrl =this.verclurl + 'BoookingInsert';
    }
    if (entity.OpsType == 'U'){
      this.APIUrl =this.url + 'BookingPracel/Update';
    }
    if (entity.OpsType == 'V'){
      this.APIUrl =this.url + 'BookingPracel/Delete';
    }
     let resp = await this.service.post<any>(this.APIUrl, entity, options).toPromise();
     return resp
  }



}
