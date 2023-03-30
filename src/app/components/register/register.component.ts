import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent {

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService,
    private toastrService:ToastrService, private router:Router, spinner: NgxSpinnerService){
    super(spinner);
  }

  ngOnInit(): void {
      this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      username:["", Validators.required],
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }

  register(){
    this.showSpinner(SpinnerType.ScaleMultiple)
    if(this.registerForm.valid){
      let registerModel = JSON.parse(JSON.stringify(this.registerForm.value))
      this.authService.register(registerModel).subscribe(response => {
        this.toastrService.success(response.message, registerModel.username + " Başarıyla kaydoldu! Şimdi giriş yapabilirsiniz")
        setTimeout(() => {
          location.replace("/product")
        },1000)
        this.hideSpinner(SpinnerType.ScaleMultiple);
      }, error => {
        for(let key in error.error.data){
          this.toastrService.error(error.error.data[key], error.error.message)
        }
      });
    }else{
      this.toastrService.error("Form bilgileri eksik ya da hatali!", "Dikkat!")
      this.hideSpinner(SpinnerType.ScaleMultiple);
    }
  }

  haveToken(){
    if (localStorage.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
