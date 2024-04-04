import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  userData = new Subject();

  private readonly URL=environment.baseURL;

  createUser(modal:any)
  {
    return this.http.post(this.URL+'students',modal)
  }
  getAllUser()
  {
    return this.http.get(this.URL+'students')
  }
  getAllUserForLogin(type:string)
  {
    return this.http.get(this.URL+type)
  }
  login(modal:any)
  {
    return this.http.put(this.URL+'login/1',modal)
  }

  getStudent(id:any)
  {
    return this.http.get(this.URL +'students/'+id)
  }
  updateStudent(id:any, modal:any)
  {
    return this.http.put(this.URL +'students/'+id,modal)
  }
  getLoginData()
  {
    return this.http.get(this.URL+'login/1')
  }
  getAllStudent()
  {
    return this.http.get(this.URL +'students')
  }
}
