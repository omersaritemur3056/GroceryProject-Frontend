import { EmployeeResponseModel } from './../models/employee/employee-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = "http://localhost:8080/api/employee/getall";

  constructor(private httpClient:HttpClient) { }

  getEmployee():Observable<EmployeeResponseModel>{
    return this.httpClient.get<EmployeeResponseModel>(this.apiUrl);
  }
}
