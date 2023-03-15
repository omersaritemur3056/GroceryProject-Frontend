import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent {

  employeeUpdateForm:FormGroup;
  id:number;

  constructor(private formBuilder:FormBuilder, private employeeService:EmployeeService,
    private toastrService:ToastrService, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.createSupplierUpdateForm();
  }

  createSupplierUpdateForm(){
    this.employeeUpdateForm = this.formBuilder.group({
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      gender:["", Validators.required],
      nationalIdentity:["", Validators.required],
      birthYear:["", Validators.required],
      nationality:["", Validators.required],
      salary:["", Validators.required],
      userId:["", Validators.required],
      imageId:["", Validators.required]
    })
  }

  update(){
    if(this.employeeUpdateForm.valid){
      let employeeModel = JSON.parse(JSON.stringify(this.employeeUpdateForm.value))
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.employeeService.update(this.id, employeeModel).subscribe(response => {
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
