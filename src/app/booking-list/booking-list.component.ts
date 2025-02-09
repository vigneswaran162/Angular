import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import { BookingPracelService } from '../services/booking-pracel.service';
import { LoginService } from '../services/login.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements AfterViewInit {


  dataSource: any;
  _formName = 'ADD PRODUCTS LIST'
  displayedColumns = ['docno','docdate','from','to','pay','amount','status','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  _dataListLength: any;
  @Input('focuMe') isFocused: boolean;
  @ViewChild('input') _el: ElementRef;
  dataList: any;

  user:any;
  constructor(private service:BookingPracelService,private appservice:LoginService){}
  BookingDet: any;


  async ngAfterViewInit() {
    this.user = this.appservice.getuserdata()
    this._el.nativeElement.focus();
    await this.managebooking()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async managebooking(){
    let response:any = await this.service.GetManageBooking(this.user.BranchCode).catch(err=>{
      alert(err.message)
    })
    if(response != undefined){
      if(response.Boolval == true){
        this.dataList = response.data;
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this._dataListLength = response.data.length;
        this.dataSource.paginator.length = response.data.length;      }else{
        alert(response.returnerror)
      }
    }
  }


  onEdit(item:any){

  }
}


