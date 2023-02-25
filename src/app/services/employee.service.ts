import { GetAllEmployeeResponse } from 'src/app/models/employee/get-all-employee';
import { ListResponseModel } from './../models/list-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient:HttpClient) { }

  getEmployees():Observable<ListResponseModel<GetAllEmployeeResponse>>{
    let newPath = this.apiUrl + "employee/getall"
    return this.httpClient.get<ListResponseModel<GetAllEmployeeResponse>>(newPath);
  }
}
