import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllImageResponse } from '../models/image/get-all-image-response';
import { ListResponseModel } from '../models/list-response-model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }

  upload(file: FormData): Observable<any> {
    let newPath = this.apiUrl + "image/add";
    return this.httpClient.post<any>(newPath, file);
  }

  getPhotos(): Observable<ListResponseModel<GetAllImageResponse>> {
    let newPath = this.apiUrl + "image/getall"
    return this.httpClient.get<ListResponseModel<GetAllImageResponse>>(newPath);
  }

  getPhotosBySortingNameAsc(sortBy: string): Observable<ListResponseModel<GetAllImageResponse>> {
    let newPath = this.apiUrl + "image/getlistbysorting?sortBy=" + sortBy
    return this.httpClient.get<ListResponseModel<GetAllImageResponse>>(newPath);
  }

  getPhotosByPaginationAndSortingNameAsc(pageNo: number, pageSize: number, sortBy: string): Observable<ListResponseModel<GetAllImageResponse>> {
    let newPath = this.apiUrl +
      `image/getlistbypaginationandsorting?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    return this.httpClient.get<ListResponseModel<GetAllImageResponse>>(newPath);
  }
}
