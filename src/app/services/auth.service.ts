import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorizeModel } from '../models/authorize-model';
import { DataResponseModel } from '../models/data-response-model';
import { LoginModel } from '../models/login/login-model';
import { RegisterModel } from '../models/register/register-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://localhost:8080/api/";
  role = localStorage.getItem("roles");
  authorizeResponse:AuthorizeModel = {role:"", isAuthorized:false}

  constructor(private httpClient:HttpClient) { }

  register(user:RegisterModel){
    let newPath = this.apiUrl + "user/signup"
    return this.httpClient.post<DataResponseModel<RegisterModel>>(newPath, user);
  }

  login(user:LoginModel){
    let newPath = this.apiUrl + "user/signin"
    return this.httpClient.post<DataResponseModel<LoginModel>>(newPath, user);
  }

  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }else{
      return false;
    }
  }

  hasAutorized(){
    if (this.role != null) {
      this.authorizeResponse.role = this.role;
      this.authorizeResponse.isAuthorized = true;
      return this.authorizeResponse;
    }
    return this.authorizeResponse;
  }
}
