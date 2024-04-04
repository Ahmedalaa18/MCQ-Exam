import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatrialModule } from './matrial.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    MatrialModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module




  ],
  exports:[
    MatrialModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    CommonModule,
    NavbarComponent,
    ReactiveFormsModule

  ]
})
export class SharedModule { }
