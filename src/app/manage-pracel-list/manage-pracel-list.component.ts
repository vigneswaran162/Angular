import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import { BookingPracelService } from '../services/booking-pracel.service';
import { LoginService } from '../services/login.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-manage-pracel-list',
  standalone: true,
  imports: [],
  templateUrl: './manage-pracel-list.component.html',
  styleUrl: './manage-pracel-list.component.scss'
})
export class ManagePracelListComponent implements AfterViewInit {
   dataSource: any;
  displayedColumns = ['docno','docdate','to','pay','amount','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  _dataListLength: any;
  @Input('focuMe') isFocused: boolean;
  @ViewChild('input') _el: ElementRef;
  dataList: any;

  user:any;
  constructor(private service:BookingPracelService,private appservice:LoginService){
    this.user = this.appservice.getuserdata()

  }
  BookingDet: any;


  async ngAfterViewInit() {
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
    
        this.dataList = response.data;
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this._dataListLength = response.data.length;
        this.dataSource.paginator.length = response.data.length;      }else{
      
    }
  }


  onEdit(item:any){

  }
}
