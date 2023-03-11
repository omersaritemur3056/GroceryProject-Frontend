import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {

  employeeAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private employeeService:EmployeeService,
    private toastrService:ToastrService){}

  ngOnInit(): void {
      this.createEmployeeAddForm();
  }

  createEmployeeAddForm(){
    this.employeeAddForm = this.formBuilder.group({
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

  add(){
    if(this.employeeAddForm.valid){
      let employeeModel = JSON.parse(JSON.stringify(this.employeeAddForm.value))
      this.employeeService.add(employeeModel).subscribe(response => {
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
