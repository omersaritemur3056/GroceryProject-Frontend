import { GetAllEmployeeResponse } from 'src/app/models/employee/get-all-employee-response';
import { ListResponseModel } from './../models/list-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateEmployeeRequest } from '../models/employee/create-employee-request';
import { ResponseModel } from '../models/response-model';
import { DeleteEmployeeRequest } from '../models/employee/delete-employee-request';
import { UpdateEmployeeRequest } from '../models/employee/update-employee-request';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<ListResponseModel<GetAllEmployeeResponse>> {
    let newPath = this.apiUrl + "employee/getall"
    return this.httpClient.get<ListResponseModel<GetAllEmployeeResponse>>(newPath);
  }

  getEmployeesBySortingNameAsc(sortBy: string): Observable<ListResponseModel<GetAllEmployeeResponse>> {
    let newPath = this.apiUrl + "employee/getlistbysorting?sortBy=" + sortBy
    return this.httpClient.get<ListResponseModel<GetAllEmployeeResponse>>(newPath);
  }

  getEmployeesByPaginationAndSortingNameAsc(pageNo: number, pageSize: number, sortBy: string): Observable<ListResponseModel<GetAllEmployeeResponse>> {
    let newPath = this.apiUrl +
      `employee/getlistbypaginationandsorting?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    return this.httpClient.get<ListResponseModel<GetAllEmployeeResponse>>(newPath);
  }

  add(employee: CreateEmployeeRequest): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "employee/add", employee);
  }

  delete(employee: DeleteEmployeeRequest): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "employee/delete", { body: employee });
  }

  update(id: number, employee: UpdateEmployeeRequest): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + "employee/update?id=" + id, employee);
  }
}
