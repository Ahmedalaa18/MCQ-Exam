import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MCQExam-Angular';

  constructor(private service:AuthService){}
  ngOnInit(): void {
  this.getData()
  }

  // when project load set data in auth.service
  getData()
  {
    this.service.getLoginData().subscribe({
      next:(data:any)=>{
    //must send data by using next(data)
        this.service.userData.next(data) //using too in login
      }
    })
  }
}
