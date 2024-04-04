import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  dataSource:any
  dataTable:any
  displayedColumns:any
  constructor(private authService:AuthService) {
    this.displayedColumns = ['position', 'userName', 'subject', 'degree'];
   }


  ngOnInit(): void {
    this.getAllStudent()
  }
  getAllStudent() {
    this.authService.getAllStudent().subscribe((res: any) => {
      this.dataSource = res?.map((student: any) => {
        if (student?.subjects) {
          return student?.subjects?.map((sub: any) => {
            return {
              userName: student.userName,
              subject: sub.name,
              degree: sub.degree,
            };
          });
        } else {
          return [{
            userName: student.userName,
            subject: "-",
            degree: "-"
          }];
        }
      });

      // Initialize dataTable
      this.dataTable = [];

      // Flatten the dataSource array and push items into dataTable
      this.dataSource.forEach((item: any) => {
        item.forEach((subItem: any) => {
          this.dataTable.push({
            userName: subItem.userName,
            subject: subItem.subject,
            degree: subItem.degree,
          });
        });
      });

      console.log(this.dataTable);
    });
  }

}
