import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { ListResponseModel } from '../models/list-response-model';
import { ResponseModel } from '../models/response-model';
import { DeleteUserRequest } from '../models/user/delete-user-request';
import { GetAllUserResponse } from '../models/user/get-all-user-response';
import { UpdateUserRequest } from '../models/user/update-user-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<ListResponseModel<GetAllUserResponse>> {
    let newPath = this.apiUrl + "user/getall"
    return this.httpClient.get<ListResponseModel<GetAllUserResponse>>(newPath);
  }

  async getUsersAsync() {
    let newPath = this.apiUrl + "user/getall"
    const observable = this.httpClient.get<ListResponseModel<GetAllUserResponse>>(newPath);
    const promiseData = firstValueFrom(observable);

    return await promiseData;
  }

  getUsersBySortingNameAsc(sortBy: string): Observable<ListResponseModel<GetAllUserResponse>> {
    let newPath = this.apiUrl + "user/getlistbysorting?sortBy=" + sortBy
    return this.httpClient.get<ListResponseModel<GetAllUserResponse>>(newPath);
  }

  getUsersByPaginationAndSortingNameAsc(pageNo: number, pageSize: number, sortBy: string): Observable<ListResponseModel<GetAllUserResponse>> {
    let newPath = this.apiUrl +
      `user/getlistbypaginationandsorting?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    return this.httpClient.get<ListResponseModel<GetAllUserResponse>>(newPath);
  }

  update(id: number, user: UpdateUserRequest): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + "user/update?id=" + id, user);
  }

  delete(user: DeleteUserRequest): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "user/delete?id=" + user.id);
  }
}
