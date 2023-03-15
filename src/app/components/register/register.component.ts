import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService,
    private toastrService:ToastrService){}

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
    if(this.registerForm.valid){
      let registerModel = JSON.parse(JSON.stringify(this.registerForm.value))
      this.authService.register(registerModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarili")
      }, error => {
        for(let key in error.error.data){
          this.toastrService.error(error.error.data[key], error.error.message)
        }
      });
    }else{
      this.toastrService.error("Form bilgileri eksik ya da hatali!", "Dikkat!")
    }
  }
}
