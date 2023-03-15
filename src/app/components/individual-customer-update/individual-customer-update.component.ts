import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IndividualCustomerService } from 'src/app/services/individual-customer.service';

@Component({
  selector: 'app-individual-customer-update',
  templateUrl: './individual-customer-update.component.html',
  styleUrls: ['./individual-customer-update.component.css']
})
export class IndividualCustomerUpdateComponent {

  individualCustomerUpdateForm:FormGroup;
  id:number;

  constructor(private formBuilder:FormBuilder, private individualCustomerService:IndividualCustomerService,
    private toastrService:ToastrService, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.createIndividualCustomerUpdateForm();
  }

  createIndividualCustomerUpdateForm(){
    this.individualCustomerUpdateForm = this.formBuilder.group({
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

  update(){
    if(this.individualCustomerUpdateForm.valid){
      let individualCustomerModel = JSON.parse(JSON.stringify(this.individualCustomerUpdateForm.value))
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.individualCustomerService.update(this.id, individualCustomerModel).subscribe(response => {
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
