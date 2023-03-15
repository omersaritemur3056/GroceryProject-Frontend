import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {

  userUpdateForm:FormGroup;
  id:number;

  constructor(private formBuilder:FormBuilder, private userService:UserService,
    private toastrService:ToastrService, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.createUserUpdateForm();
  }

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      username:["", Validators.required],
      email:["", Validators.required],
      role:[[""]],
      password:["", Validators.required]
    })
  }

  update(){
    if(this.userUpdateForm.valid){
      let userModel = JSON.parse(JSON.stringify(this.userUpdateForm.value))
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.userService.update(this.id, userModel).subscribe(response => {
          this.toastrService.success(response.message, "Başarili")
        }, error => {
          for(let key in error.error.data){
            this.toastrService.error(error.error.data[key], error.error.message)
          }
        });
      })
    }else{
      this.toastrService.error("Form bilgileri eksik ya da hatali!", "Dikkat!")
    }
  }
}
