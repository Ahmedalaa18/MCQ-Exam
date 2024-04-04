import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent  implements OnInit {

  subjects:any[]=[]
  user:any={}

  constructor(private service:DoctorService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getSubjects()
    this.GetRole()
  }

  getSubjects()
  {
    this.service.GetAllSubjects().subscribe({
      next:(data:any)=>
      {
        this.subjects=data;
      }
    })
  }

  GetRole()
  {
    this.service.getLoginData().subscribe((res:any)=>{
      this.user =res;
    })
  }

  delete(index:number)
  {
    let id = this.subjects[index].id;
    this.subjects.splice(index,1);
    this.service.DeleteSubject(id).subscribe((res:any)=>{
      this.toastr.error("Subject is deleted")
    })
;
  }
}
