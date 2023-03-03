import { GetAllEmployeeResponse } from 'src/app/models/employee/get-all-employee-response';
import { ListResponseModel } from './../models/list-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateEmployeeRequest } from '../models/employee/create-employee-request';
import { ResponseModel } from '../models/response-model';

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

  getEmployeesBySortingNameAsc():Observable<ListResponseModel<GetAllEmployeeResponse>>{
    let newPath = this.apiUrl + "employee/getlistbysorting"
    return this.httpClient.get<ListResponseModel<GetAllEmployeeResponse>>(newPath);
  }

  getEmployeesByPaginationAndSortingNameAsc(pageNo:number):Observable<ListResponseModel<GetAllEmployeeResponse>>{
    let newPath = this.apiUrl + "employee/getlistbypaginationandsorting?pageNo=" + pageNo
    return this.httpClient.get<ListResponseModel<GetAllEmployeeResponse>>(newPath);
  }

  add(employee:CreateEmployeeRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "employee/add", employee);
  }

}
