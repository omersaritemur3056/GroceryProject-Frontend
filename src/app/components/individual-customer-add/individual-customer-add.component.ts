import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IndividualCustomerService } from 'src/app/services/individual-customer.service';

@Component({
  selector: 'app-individual-customer-add',
  templateUrl: './individual-customer-add.component.html',
  styleUrls: ['./individual-customer-add.component.css']
})
export class IndividualCustomerAddComponent {

  individualCustomerAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private individualCustomerService:IndividualCustomerService,
    private toastrService:ToastrService){}

  ngOnInit(): void {
      this.createIndividualCustomerAddForm();
  }

  createIndividualCustomerAddForm(){
    this.individualCustomerAddForm = this.formBuilder.group({
      address:["", Validators.required],
      phoneNumber:["", Validators.required],
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      gender:["", Validators.required],
      nationalIdentity:["", Validators.required],
      userId:["", Validators.required],
      imageId:["", Validators.required]
    })
  }

  add(){
    if(this.individualCustomerAddForm.valid){
      let individualCustomerModel = JSON.parse(JSON.stringify(this.individualCustomerAddForm.value))
      this.individualCustomerService.add(individualCustomerModel).subscribe(response => {
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
