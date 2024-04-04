import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  userData = new Subject();
  constructor(private http:HttpClient) { }
  private readonly URL=environment.baseURL;

  CreateSubject(modal:any)
  {
    return this.http.post(this.URL + 'subjects',modal);
  }

  UpdateSubject(modal:any,id:number)
  {
    return this.http.put(this.URL + 'subjects/'+id ,modal);
  }

  GetAllSubjects()
  {
    return this.http.get(this.URL + 'subjects');
  }
  GetSubjectById(id:any)
  {
    return this.http.get(this.URL + 'subjects/' + id)
  }

  getLoginData()
  {
    return this.http.get(this.URL+'login/1')
  }
  DeleteSubject(id:number)
  {
    return this.http.delete(this.URL +'subjects/'+id)
  }
}
