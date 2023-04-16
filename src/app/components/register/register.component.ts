import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService, private spinner: NgxSpinnerService,
    private authService: AuthService, private socialAuthService: SocialAuthService) {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      console.log(user);
      spinner.show(SpinnerType.ScaleMultiple);
      authService.googleLogin(user).subscribe(response => {
        this.toastrService.success(user.name, "Hoş geldiniz!");
        localStorage.setItem("token", user.idToken);
        localStorage.setItem("roles", "USER");
        setTimeout(() => {
          location.replace("/product")
        }, 1000)
        spinner.hide(SpinnerType.ScaleMultiple);
      });
    });
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  register() {
    this.spinner.show(SpinnerType.ScaleMultiple)
    if (this.registerForm.valid) {
      let registerModel = JSON.parse(JSON.stringify(this.registerForm.value))
      this.authService.register(registerModel).subscribe(response => {
        this.toastrService.success(response.message, registerModel.username + " Başarıyla kaydoldu! Şimdi giriş yapabilirsiniz")
        setTimeout(() => {
          location.replace("/product")
        }, 1000)
        this.spinner.hide(SpinnerType.ScaleMultiple);
      }, error => {
        for (let key in error.error.data) {
          this.toastrService.error(error.error.data[key], error.error.message)
          this.spinner.hide(SpinnerType.ScaleMultiple);
        }
      });
    } else {
      this.toastrService.error("Form bilgileri eksik ya da hatali!", "Dikkat!")
      this.spinner.hide(SpinnerType.ScaleMultiple);
    }
  }

  haveToken() {
    if (localStorage.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
