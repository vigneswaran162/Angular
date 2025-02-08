import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{


  UserName:string;
  UserPassword:string;


  constructor(private router:Router,private  service:LoginService ,private toast:ToastrService ,    private spinner:NgxSpinnerService
  ){}
ngOnInit(): void {
  
}



  formvalidation(){
    if(this.UserName == '' || this.UserName == undefined || this.UserName == null){
      this.toast.info('UserName Cannot Be Blank','')
      return false
    }
    if(this.UserPassword == '' || this.UserPassword == undefined || this.UserPassword == null){
      this.toast.info('Password Cannot Be Blank','')

      return false
    }
    return true
  }
  


  async onSubmit(event:any){
    
    if(this.formvalidation()== true){
      this.spinner.show()
      let response:any = await this.service.Login(this.UserName,this.UserPassword).catch(err=>{
        this.toast.warning(err.message)
        this.spinner.hide()
      })
      if(response != undefined){
        if(response.Boolval == true){
          const authData = {
            UserCode: response.userdata[0].UserCode,
            UserName: response.userdata[0].UserName,
            PhoneNo: response.userdata[0].PhoneNo,
            BranchCode: response.userdata[0].BranchCode,
            BranchName: response.userdata[0].BranchName,
            District: response.userdata[0].District,
            state: response.userdata[0].state,
            token: response.Token
          };
          localStorage.setItem('currentUser', JSON.stringify(authData));
          this.spinner.hide()
          this.router.navigate(['/DashBoard'])
        }else{
          this.toast.error(response.returnerror)
          this.spinner.hide()
  
        }
    }
  }
  }
  






}
