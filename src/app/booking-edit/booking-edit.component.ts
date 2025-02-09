import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { BookingPracelDetModel, BookingPracelModel } from '../model/BookingPracelModel';
import { BookingPracelService } from '../services/booking-pracel.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


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

    modalRef?: BsModalRef;
  BookingListDet: any;
  
  dataSource: any;
  displayedColumns = ['docno','docdate','amount','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  _dataListLength: any;
  @Input('focuMe') isFocused: boolean;
  @ViewChild('input') _el: ElementRef;
  dataList: any;



  constructor( private service:BookingPracelService,private appservice:LoginService, private toast:ToastrService,
    private spinner:NgxSpinnerService,private modalService:BsModalService


  ) {
    this.user = this.appservice.getuserdata()
   }

  async ngOnInit() {
    this.spinner.show()
    this.currentDate = new Date();
    this.model = new BookingPracelModel()
    this.model.PaymentMode ='Pay'
    this.model.BookingDet = []
    await this.GetBranchCode()
    await this.GetArticle()
    this.AddRow()
    this.model.DocNo='123432222'
    await this.GetDocNo()
    this.model.FromPlace = this.user.BranchName+'-->'+this.user.District
    this.spinner.hide()
 
  }

  AddRow() {
    if(this.AddRowValidation()==true){
    let obj = new BookingPracelDetModel()
    this.model.BookingDet.push(obj)
    }
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
    mod.ToPhoneNo = this.model.ToPhoneNo;
    mod.FormBranchCode = this.user.BrachCode;
    mod.ToBranchCode = this.model.ToBranchCode;
    mod.Cancel = 'N',
    mod.Void = 'N',
    mod.Status = 'loaded'
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
        Rate:'',
        Status:'loaded',
        FormBranchCode:this.user.BranchCode,
        ToBranchCode:this.model.ToBranchCode
      }
      mod.BookingDet.push(obj)

    }
    return mod
  }


async  OnSubmit(event:any){

  if(this.formvalidation()== true){
    event.target.disabled = true;

    const editmod = this.preparemodel();
    editmod.OpsType = "S";
    await this.CRUD(editmod)
    event.target.disabled = false;

  }
  }



  async CRUD(_model:BookingPracelModel) {
    this.spinner.show()

    let response = await this.service.CRUD(_model).catch((err) => {
        this.toast.warning(err.message)
        this.spinner.hide()

    });
   if(response != undefined){
    if (response.Boolval == true) {
      Swal.fire({
        title: 'Sucessfully Booked Pracel ...',
        timer: 2000,
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        customClass: {
          icon: 'custom-icon-class' 
        }
      })
      this.spinner.hide()
     this.ngOnInit()
    } else {
      this.toast.error(response.returnerror,'')
      this.spinner.hide()
    }
   }
  }

  calculateTotalAmount() {
    this.model.TotalAmount = this.model.BookingDet.reduce((sum, item:any) => {
      return sum + (parseFloat(item.FreightAmount) || 0);
    }, 0);
  }

  async GetDocNo (){
    let response:any = await this.service.GetDocNo().catch(err=>{
        this.toast.warning(err.message)
    })
    if(response != undefined){

         this.model.DocNo =''
        this.model.DocNo = 'BN'+'-'+this.user.UserCode+'-'+this.user.BranchCode+'-'+response.count;
      }else{
        this.toast.error(response.error,'')

      }
  }
  async GetArticle (){
    let response:any = await this.service.GetArticelAll().catch(err=>{
        this.toast.warning(err.message)
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
        this.toast.error(response.returnerror,'')
      }
    }
  }



  async GetBranchCode (){
    let response:any = await this.service.GetBranchCode(this.user.BranchCode).catch(err=>{
        this.toast.warning(err.message)
    })
    if(response != undefined){
    
        this.BranchDet = response;


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
    
    }
    else{
      this.toast.error(response.returnerror,'')

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

  onSelectBranch(event:any){
    let filterddata = this.BranchDet.find((item:any)=>item.SearchField == event.item)
    this.model.ToBranchCode = filterddata.BranchCode
  }




  formvalidation(){
    if(this.model.DocNo == "" || this.model.DocNo == null || this.model.DocNo == undefined){
      this.toast.info('Doc No  Cannot Be Blank','')
      return false
    }
    
    if(this.model.FromPlace ==  "" || this.model.FromPlace == null || this.model.FromPlace == undefined){
      this.toast.info('From PlaceCannot Be Blank','')
      return false
    }
    if(this.model.ToPlace ==  "" || this.model.ToPlace == null || this.model.ToPlace == undefined){
      this.toast.info('To Place Cannot Be Blank','')
      return false
    }


    if(this.model.FromName ==  "" || this.model.FromName == null || this.model.FromName == undefined){
      this.toast.info('From Name Cannot Be Blank','')
      return false
    }
    if(this.model.ToName ==  "" || this.model.ToName == null || this.model.ToName == undefined){
      this.toast.info('To Name Cannot Be Blank','')
      return false
    }
    if(this.model.FromPhoneNo ==  "" || this.model.FromPhoneNo == null || this.model.FromPhoneNo == undefined){
      this.toast.info('From PhoneNo Cannot Be Blank','')  
      return false
    }
    if(this.model.ToPhoneNo ==  "" || this.model.ToPhoneNo == null || this.model.ToPhoneNo == undefined){
      this.toast.info('To PhoneNo Cannot Be Blank','')
      return false
    }
   


    return true
    
    }
    

    AddRowValidation() {
      let rowid = this.model.BookingDet.length - 1;
      if (rowid >= 0) {
        if (this.model.BookingDet[rowid].Article == null || this.model.BookingDet[rowid].Article == undefined || this.model.BookingDet[rowid].Article == '') {
          this.toast.info('Article should not be empty', '');
          return false;
        }
        else if (this.model.BookingDet[rowid].Quantity == null || this.model.BookingDet[rowid].Quantity == undefined || this.model.BookingDet[rowid].Quantity == '') {
          this.toast.info('Quantity should not be empty','');
          return false;
        }
        else if (this.model.BookingDet[rowid].Quantity == '0' || this.model.BookingDet[rowid].Quantity == '00') {
          this.toast.info('Quantity 0 should not Accepted','');
          return false;
        }
      }
      return true
    }




    OnBlurQuan(event:any,i:any){
      if(event.target.value != ""){
        if (!event.target.validity.valid) { 
          this.model.BookingDet[i].Quantity = '';
        }
      }
  }

  OnBlurDis(event:any,i:any){
    if(event.target.value != ""){
      if (!event.target.validity.valid) { 
        this.model.BookingDet[i].Discount = '';
      }
    }
}


OnBlurFromPhone(event:any){
  if(event.target.value != ""){
    if (!event.target.validity.valid) { 
      this.model.FromPhoneNo = '';
    }
  }
}


OnBlurToPhone(event:any){
  if(event.target.value != ""){
    if (!event.target.validity.valid) { 
      this.model.ToPhoneNo = '';
    }
  }
}


 async openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
    await this.GetAll()

  }




  async GetAll (){
    let response:any = await this.service.GetAll().catch(err=>{
        this.toast.warning(err.message)
        this.spinner.hide()
    })
    if(response != undefined){
         this.dataList = response;
         this.dataSource = new MatTableDataSource(response);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
         this._dataListLength = response.length;
         this.dataSource.paginator.length = response.length;  
         this.spinner.hide()
      }else{
        this.toast.error(response.error,'')
        this.spinner.hide()

      }
  }
}
