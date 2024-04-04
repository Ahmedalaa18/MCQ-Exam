import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { group } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  students:any[]=[]
  userForm=new FormGroup({
    userName:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required]),
    confirmPassword:new FormControl(null,[Validators.required])
  })

  constructor(private service:AuthService ,private router:Router,private toastr:ToastrService){}

  ngOnInit(): void {
    this.getAllStudent()
  }

  getAllStudent()  //get all users and call in ngOnInit
  {
    this.service.getAllUser().subscribe({
      next:(data:any)=>
      {
        this.students=data;
      }
    })
  }

  submit()
  {
    const modal={
      userName:this.userForm.value.userName,
      email:this.userForm.value.email,
      password:this.userForm.value.password,
    }
    // check if email found
    let index=this.students.findIndex(item =>item.email == this.userForm.value.email)
    if(index !=-1)
    {
      this.toastr.error("الايميل موجود مسبقا")
    }
    else{
      this.service.createUser(modal).subscribe({
        next:(data:any)=>
        {
          this.toastr.success("تم انشاء الحساب بنجاح")
          this.router.navigate(['/Login'])
        }
      })
    }
  }
}
