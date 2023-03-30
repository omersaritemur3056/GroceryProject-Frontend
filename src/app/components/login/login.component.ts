import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, 
    private toastrService:ToastrService, private router:Router, spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login(){
    this.showSpinner(SpinnerType.ScaleMultiple)
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.info("Hoş geldiniz!", response.data.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("roles", response.data.roles.toLocaleString())
        setTimeout(() => {
          location.replace("/product")
        },1000)
        this.hideSpinner(SpinnerType.ScaleMultiple);
      }, error => {
        console.log(error);
        this.toastrService.error(error.error.message, "Hatalı bilgiler!");
        this.hideSpinner(SpinnerType.ScaleMultiple);
      })
    }
  }
}
