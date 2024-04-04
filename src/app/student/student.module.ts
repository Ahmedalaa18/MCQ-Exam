import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam/exam.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ExamComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class StudentModule { }
