import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit {

  userData:any=null

  constructor(private service:AuthService) { }

  ngOnInit(): void {
    this.service.userData.subscribe({
      next:(data:any)=>{
        //if fond role recore data
        if (data.role) {
          this.userData=data;
        }
      }
    })
  }

  logOut()
  {
    const modal={}
    this.service.login(modal).subscribe(data=>{
      this.userData=null
      this.service.userData.next(data);
    })
  }
}
