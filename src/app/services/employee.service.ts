import { GetAllEmployeeResponse } from 'src/app/models/employee/get-all-employee';
import { ListResponseModel } from './../models/list-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = "http://localhost:8080/api/employee/getall";

  constructor(private httpClient:HttpClient) { }

  getEmployee():Observable<ListResponseModel<GetAllEmployeeResponse>>{
    return this.httpClient.get<ListResponseModel<GetAllEmployeeResponse>>(this.apiUrl);
  }
}
