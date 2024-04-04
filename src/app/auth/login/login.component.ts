import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type:string="students"
  users:any[]=[]
  userForm=new FormGroup({
    type:new FormControl(this.type,[Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required]),
  })
  constructor(private service:AuthService ,private router:Router,private toastr:ToastrService ) { }

  ngOnInit(): void {
    this.getUsers()
  }
  getRole(event:any)
  {
    this.type=event.value;
    this.getUsers()
  }

  getUsers()
  {
    this.service.getAllUserForLogin(this.type).subscribe({
      next:(data:any)=>{
        this.users=data;
      }
    })
  }

  submit()
  {
    let index=this.users.findIndex(item=>item.email == this.userForm.value.email
                          && item.password ==this.userForm.value.password )
    if(index ==-1)
    {
      this.toastr.error("الايميل او كلمة المرور غير صحيحة ")
    }
    else{
      const modal={
        userName:this.users[index].userName,
        role:this.type,
        userId:this.users[index].id
      }
      this.service.login(modal).subscribe({
        next:(data:any)=>
        {
          this.service.userData.next(data)
          this.toastr.success("تم تسجيل الدخول بنجاح")
          this.router.navigate(['/subjects'])
        }
      })
    }

  }
}
