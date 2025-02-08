import { Component, OnInit } from '@angular/core';

import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { BookingPracelDetModel, BookingPracelModel } from '../model/BookingPracelModel';
import { BookingPracelService } from '../services/booking-pracel.service';
@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss']
})
export class BookingEditComponent implements OnInit  {
  

  currentDate = new Date();
  model: BookingPracelModel;
  ArticleDet:any;
  search:any;
  BranchDet: any;
  Branchsearch: any;
  user:any;

  constructor( private service:BookingPracelService,private appservice:LoginService

  ) {
    this.user = this.appservice.getuserdata()
   }

  async ngOnInit() {
    this.currentDate = new Date();
    this.model = new BookingPracelModel()
    this.model.PaymentMode ='Pay'
    this.model.BookingDet = []
    await this.GetBranchCode()
    await this.GetArticle()
    this.AddRow()
    // await this.GetDocNo()
    this.model.FromPlace = this.user.BranchName+'-->'+this.user.District
 
  }

  AddRow() {
    let obj = new BookingPracelDetModel()
    this.model.BookingDet.push(obj)
  }


  preparemodel() {
    const mod = new BookingPracelModel();

    mod.DocNo = this.model.DocNo;
    mod.DocDate = '';
    mod.PaymentMode = this.model.PaymentMode;
    mod.TotalAmount = this.model.TotalAmount;
    mod.FromName = this.model.FromName;
    mod.FromPhoneNo = this.model.FromPhoneNo;
    mod.FromPlace = this.model.FromPlace;
    mod.FromGSTNo = this.model.FromGSTNo;
    mod.ToName = this.model.ToName;
    mod.ToGSTNo = this.model.ToGSTNo;
    mod.ToPlace = this.model.ToPlace;
    mod.ToPhoneNo = this.model.ToPhoneNo
    mod.Cancel = 'N',
      mod.Void = 'N',

      mod.BookingDet = [];


    for (let i = 0; i < this.model.BookingDet.length; i++) {
      let obj = {
        DocNo: this.model.DocNo,
        DocDate:this.model.DocNo,
        PaymentMode:this.model.PaymentMode,
        UserCode:'admin',
        Article: this.model.BookingDet[i].Article,
        Description:this.model.BookingDet[i].Description,
        ItemValue: '0',
        Weight:'0',
        Quantity:this.model.BookingDet[i].Quantity,
        Discount: this.model.BookingDet[i].Discount,
        TotalAmount: 0,
        FreightAmount: this.model.BookingDet[i].FreightAmount,
        Cancel: 'N',
        CanceledBy: '',
        Void: '',
        createdBy: '',
        updatedBy: '',
        voidedBy: '',
        Rate:''
      }
      mod.BookingDet.push(obj)

    }
    return mod
  }


async  OnSubmit(){
    const editmod = this.preparemodel();
    editmod.OpsType = "S";
    await this.CRUD(editmod)
  }



  async CRUD(_model:BookingPracelModel) {
  
    let response = await this.service.CRUD(_model).catch((err) => {
      alert(err.message)
    });
   if(response != undefined){
    if (response.Boolval == true) {
     alert('SAVED SUCESSFULLY')
     this.ngOnInit()
    } else {
      alert(response.returnerror)
    }
   }
  }

  calculateTotalAmount() {
    this.model.TotalAmount = this.model.BookingDet.reduce((sum, item:any) => {
      return sum + (parseFloat(item.FreightAmount) || 0);
    }, 0);
  }

  async GetDocNo (){
    let response:any = await this.service.GetDocNo(this.user.UserCode,this.user.BranchCode).catch(err=>{
      alert(err.message)
    })
    if(response != undefined){
      if(response.Boolval == true){
         this.model.DocNo =''
        this.model.DocNo = response.data.DOCNO;
      }else{
        alert(response.returnerror)
      }
    }
  }
  async GetArticle (){
    let response:any = await this.service.GetArticelAll().catch(err=>{
      alert(err.message)
    })
    if(response != undefined){
      if(response.Boolval == true){
        this.ArticleDet = response.data;


        this.search = (text$: Observable<string>): Observable<string[]> =>
          text$.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            map(term => 
              term.length < 1 
                ? [] 
                : this.ArticleDet.map((i:any) => i.ArticleName).filter((name:any) => name.toLowerCase().includes(term.toLowerCase())).slice(0, 10)
            )
          );
      }else{
        alert(response.returnerror)
      }
    }
  }



  async GetBranchCode (){
    let response:any = await this.service.GetBranchCode(this.user.BranchCode).catch(err=>{
      alert(err.message)
    })
    if(response != undefined){
      if(response.Boolval == true){
        this.BranchDet = response.data;


        this.Branchsearch = (text$: Observable<string>): Observable<string[]> =>
          text$.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            map(term => 
              term.length < 1 
                ? [] 
                : this.BranchDet.map((i:any) => i.SearchField).filter((name:any) => name.toLowerCase().includes(term.toLowerCase())).slice(0, 10)
            )
          );
      }else{
        alert(response.returnerror)
      }
    }
  }


  onSelect(event: any,i:number) {
    let filterddata = this.ArticleDet.find((item:any)=>item.ArticleName == event.item)
    this.model.BookingDet[i].Rate = filterddata.Amount
  }

  onBlurQty(i:any){
    this.model.BookingDet[i].FreightAmount = Number(this.model.BookingDet[i].Rate) * Number(this.model.BookingDet[i].Quantity)
    this,this.calculateTotalAmount()
  }

}
