import { Component, OnInit } from '@angular/core';
import { BookingPracelService } from '../services/booking-pracel.service';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  [x: string]: any;  
   

  fromDate:any;
  todate:any;
  BookingDet: any;
  TableReport:boolean = false
  constructor (private service:BookingPracelService  ,private toast:ToastrService){}

  ngOnInit(): void {
    this.TableReport = false
  }


  
  formvalidation(){
    if(this.fromDate == '' || this.fromDate == undefined || this.fromDate == null){
      this.toast.info('From Date Cannot Be Blank','')
      return false
    }
    if(this.todate == '' || this.todate == undefined || this.todate == null){
      this.toast.info('To Date Cannot Be Blank','')

      return false
    }
    return true
  }


  async GetReport (Type:any){
   if(this.formvalidation()== true){
    let response:any = await this.service.GetReport(this.fromDate,this.todate).catch(err=>{
      this.toast.warning(err.message)
  })
  if(response != undefined){
      if(response.data.length > 0){
        this.BookingDet = response.data;
        if(Type == 'Report'){
         this.TableReport = true
        }
        else if(Type=='pdf'){
          this.exportToPDF()
         }else if(Type == 'xlxs'){
          this.exportToExcel()
         }

      }else{
        this.toast.error('No Record Found')

      }


 

    }else{
      this.toast.error(response.error,'')

    }
   }
  }



  exportToPDF() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth()
    doc.setFontSize(12);
    const formattedFromDate = this.fromDate.toLocaleDateString('en-GB'); 
    const formattedToDate = this.todate.toLocaleDateString('en-GB');
    doc.text(`Booking Statemnt Report From: ${formattedFromDate} To: ${formattedToDate}`, pageWidth / 2, 10, { align: "center" });

  
    autoTable(doc, {
      head: [[
        "Doc No", "Doc Date", "From Branch", "To Branch", "Status",
        "Payment Mode", "Article", "Item Value", "Quantity", "Freight Amount"
      ]], 
      body: this.BookingDet.map((item: any) => [
        item.DocNo, item.DocDate, item.FormBranchCode, item.ToBranchCode,
        item.Status, item.PaymentMode, item.Article, item.ItemValue,
        item.Quantity, item.FreightAmount
      ])
    });
  
    doc.save("BookingStatemntReport.pdf");
  }
  


  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.BookingDet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    saveAs(data, "BookingStatemntReport.xlsx");
  }
  
  

}



