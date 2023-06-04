import { Injectable } from '@angular/core';
import { GetAllRoleResponse } from '../models/role/get-all-role-response';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/list-response-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  categories: GetAllRoleResponse[] = [];

  apiUrl: string = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }

  async getRolesAsync() {
    let newPath = this.apiUrl + "role/getall"
    const observable = this.httpClient.get<ListResponseModel<GetAllRoleResponse>>(newPath);
    const promiseData = firstValueFrom(observable);

    return await promiseData;
  }
}
