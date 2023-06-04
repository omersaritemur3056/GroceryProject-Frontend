import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { ListResponseModel } from '../models/list-response-model';
import { CreateProducerRequest } from '../models/producer/create-producer-request';
import { DeleteProducerRequest } from '../models/producer/delete-producer-request';
import { GetAllProducerResponse } from '../models/producer/get-all-producer-response';
import { UpdateProducerRequest } from '../models/producer/update-producer-request';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }

  getProducers(): Observable<ListResponseModel<GetAllProducerResponse>> {
    let newPath = this.apiUrl + "producer/getall"
    return this.httpClient.get<ListResponseModel<GetAllProducerResponse>>(newPath);
  }

  async getProducersAsync() {
    let newPath = this.apiUrl + "producer/getall"
    const observable = this.httpClient.get<ListResponseModel<GetAllProducerResponse>>(newPath);
    const promiseData = firstValueFrom(observable);

    return await promiseData;
  }

  getProducersBySortingNameAsc(sortBy: string): Observable<ListResponseModel<GetAllProducerResponse>> {
    let newPath = this.apiUrl + "producer/getlistbysorting?sortBy=" + sortBy
    return this.httpClient.get<ListResponseModel<GetAllProducerResponse>>(newPath);
  }

  getProducersByPaginationAndSortingNameAsc(pageNo: number, pageSize: number, sortBy: string): Observable<ListResponseModel<GetAllProducerResponse>> {
    let newPath = this.apiUrl +
      `producer/getlistbypaginationandsorting?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    return this.httpClient.get<ListResponseModel<GetAllProducerResponse>>(newPath);
  }

  add(producer: CreateProducerRequest): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "producer/add", producer);
  }

  delete(producer: DeleteProducerRequest): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "producer/delete", { body: producer });
  }

  update(id: number, producer: UpdateProducerRequest): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + "producer/update?id=" + id, producer);
  }
}
