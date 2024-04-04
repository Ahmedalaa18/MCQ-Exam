import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../services/doctor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {

  subjectName =new FormControl("");
  subjectName2 = "";
  questions:any[]=[];
  correctNum:string | null=''
  startAdd:boolean =false;
  preview:boolean =false;
  stepperIndex=0;
  id:any;


  questionsForm = new FormGroup({
    question:new FormControl('',[Validators.required]),
    answer1:new FormControl('',[Validators.required]),
    answer2:new FormControl('',[Validators.required]),
    answer3:new FormControl('',[Validators.required]),
    answer4:new FormControl('',[Validators.required]),

  })
  constructor(private service:DoctorService ,private toastr:ToastrService) { }
  ngOnInit(): void {
  }
  Start()
  {
    if (this.subjectName.value == "")
    this.toastr.error("يرجي كتابة اسم المادة")
    else
    {
      this.startAdd=true;
      this.subjectName2 = this.subjectName.value as string
    }
    if (this.startAdd)
        this.stepperIndex=1
  }
    getCorrect(event:any)
    {
      this.correctNum=event.value
    }
    CreateQuestion()
    {
      if(this.correctNum)
      {
        const model={
          question:this.questionsForm.value.question,
          answer1:this.questionsForm.value.answer1,
          answer2:this.questionsForm.value.answer2,
          answer3:this.questionsForm.value.answer3,
          answer4:this.questionsForm.value.answer4,
          correctAnswer:this.questionsForm.value[this.correctNum as keyof typeof this.questionsForm.value]
        }
        this.questions.push(model);
        this.questionsForm.reset()
      }
      else
      {
        this.toastr.error("يرجي اختيار الاجابة الصحيحة")
      }
      console.log(this.questions)
    }
    clearForm()
    {
      this.questionsForm.reset();
    }
    cancel()
    {
      this.questionsForm.reset()
      this.questions=[]
      this.subjectName2 = ""
      this.subjectName.reset()
      this.stepperIndex=0
      this.startAdd=false
    }
    submit()
    {
      const modal={
        name:this.subjectName.value,
        questions:this.questions
      }
      console.log(modal)

      if (this.preview) {
        this.stepperIndex=2
      }
      else{
        this.service.CreateSubject(modal).subscribe({
          next:(data:any)=>
          {
            this.preview=true;
            this.id=data.id;
          }
        })
      }
    }
    delete(index:any)
    {
      this.questions.splice(index,1)
      const modal={
        name:this.subjectName,
        questions:this.questions
      }
      this.service.UpdateSubject(modal,this.id).subscribe((res:any)=>{
        this.toastr.error("تم حذف السوال")
      })
    }
}
