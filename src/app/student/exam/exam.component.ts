import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  id:any
  subject:any
  user:any
  studentInfo:any
  total:number = 0
  showResult:boolean=false
  userSubject:any []=[]
  validExam:boolean=true
  constructor(private myroute:ActivatedRoute, private service:DoctorService,private authService:AuthService,private toastr:ToastrService)
  {
    this.id=myroute.snapshot.params["id"];
   // this.id=myroute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.GetSubject()
    this.GetLoginData()
  }

  GetSubject()
  {
    this.service.GetSubjectById(this.id).subscribe((res:any)=>{
      this.subject=res
      // console.log(this.subject)
    })
  }
  GetLoginData()
  {
    this.service.getLoginData().subscribe((res:any)=>{
      this.user =res;
      //after get login data do this
      this.GetUserData()
    })
  }
  GetUserData(){
    this.authService.getStudent(this.user.userId).subscribe((res:any)=>{
      this.studentInfo=res
      this.userSubject = res?.subjects ? res?.subjects: [];
      this.checkValidExam()
    })
  }

  checkValidExam()
  {
    for(let x in this.userSubject)
    {
      if(this.userSubject[x].id ==this.id)
      {
        this.total=this.userSubject[x].degree
        this.validExam=false
        this.toastr.warning("لقد انجزت هذا الامتحان مسبقا")
      }
    }
    // console.log(this.validExam)
  }
  getAnswer(event:any)
  {
    let value = event.value,
        questionIndex=event.source.name
    this.subject.questions[questionIndex].studentAnswer =value
    // console.log(this.subject.questions)
  }
  getResult()
  {
    this.total=0
    for(let x in this.subject.questions)
    {
      if (this.subject.questions[x].studentAnswer==this.subject.questions[x].correctAnswer)
        this.total++
    }
    this.showResult=true

    this.userSubject.push({
      name:this.subject.name,
      id:this.id,
      degree:this.total
    })
    const model={
      userName:this.studentInfo.userName,
      email:this.studentInfo.email,
      password:this.studentInfo.password,
      subjects:this.userSubject
    }
    this.authService.updateStudent(this.user.userId,model).subscribe((res:any)=>{
      this.toastr.success("تم تسجيل النتيجة بنجاح ")
    })
   // console.log(this.total)
  }

  delete(index:any)
    {
      this.subject.questions.splice(index,1)
      const modal={
        name:this.subject.name,
        questions:this.subject.questions
      }
      this.service.UpdateSubject(modal,this.id).subscribe((res:any)=>{
        this.toastr.success("تم حذف السوال")
      })
    }
}
