import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { ListResponseModel } from '../models/list-response-model';
import { ResponseModel } from '../models/response-model';
import { CreateSupplierRequest } from '../models/supplier/create-supplier-request';
import { DeleteSupplierRequest } from '../models/supplier/delete-supplier-request';
import { GetAllSupplierResponse } from '../models/supplier/get-all-supplier-response';
import { UpdateSupplierRequest } from '../models/supplier/update-supplier-request';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }

  getSuppliers(): Observable<ListResponseModel<GetAllSupplierResponse>> {
    let newPath = this.apiUrl + "supplier/getall"
    return this.httpClient.get<ListResponseModel<GetAllSupplierResponse>>(newPath);
  }

  async getSuppliersAsync() {
    let newPath = this.apiUrl + "supplier/getall"
    const observable = this.httpClient.get<ListResponseModel<GetAllSupplierResponse>>(newPath);
    const promiseData = firstValueFrom(observable);

    return await promiseData;
  }

  getSuppliersBySortingNameAsc(sortBy: string): Observable<ListResponseModel<GetAllSupplierResponse>> {
    let newPath = this.apiUrl + "supplier/getlistbysorting?sortBy=" + sortBy
    return this.httpClient.get<ListResponseModel<GetAllSupplierResponse>>(newPath);
  }

  getSuppliersByPaginationAndSortingNameAsc(pageNo: number, pageSize: number, sortBy: string): Observable<ListResponseModel<GetAllSupplierResponse>> {
    let newPath = this.apiUrl +
      `supplier/getlistbypaginationandsorting?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    return this.httpClient.get<ListResponseModel<GetAllSupplierResponse>>(newPath);
  }

  add(supplier: CreateSupplierRequest): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "supplier/add", supplier);
  }

  delete(supplier: DeleteSupplierRequest): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "supplier/delete", { body: supplier });
  }

  update(id: number, supplier: UpdateSupplierRequest): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + "supplier/update?id=" + id, supplier);
  }
}
