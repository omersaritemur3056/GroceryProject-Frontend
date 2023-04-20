import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService, private spinner: NgxSpinnerService,
    private authService: AuthService, private activatedRoute: ActivatedRoute, private socialAuthService: SocialAuthService) {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      spinner.show(SpinnerType.ScaleMultiple);
      switch (user.provider) {
        case "GOOGLE":
          authService.googleLogin(user).subscribe(response => {
            console.log(response);
            this.toastrService.success(user.name, "Hoş geldiniz!");
            localStorage.setItem("token", user.idToken);
            localStorage.setItem("roles", "USER");
            localStorage.setItem("provider", user.provider);
            setTimeout(() => {
              location.replace("/product")
            }, 1000)
          }, error => {
            toastrService.error(error.error.message, "Hata Oluştu!")
          })
          break;

        case "FACEBOOK":
          authService.facebookLogin(user).subscribe(response => {
            console.log(response);
            this.toastrService.success(user.name, "Hoş geldiniz!");
            localStorage.setItem("token", user.authToken);
            localStorage.setItem("roles", "USER");
            localStorage.setItem("provider", user.provider);
            setTimeout(() => {
              location.replace("/product")
            }, 1000)
          }, error => {
            toastrService.error(error.error.message, "Hata Oluştu!")
          })
          break;
      };
      spinner.hide(SpinnerType.ScaleMultiple);
    });
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    this.spinner.show(SpinnerType.ScaleMultiple)
    if (this.loginForm.valid) {
      const loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.success(response.data.username, "Hoş geldiniz!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("roles", response.data.roles.toLocaleString());
        this.activatedRoute.queryParams.subscribe(params => {
          const returnUrl: string = params['returnUrl']
          if (returnUrl) {
            location.replace(returnUrl);
          } else {
            setTimeout(() => {
              location.replace("/product")
            }, 1000)
          }
        })
      }, error => {
        this.toastrService.error(error.error.message, "Hatalı bilgiler!");
        this.spinner.hide(SpinnerType.ScaleMultiple);
      })
    }
  }
}
