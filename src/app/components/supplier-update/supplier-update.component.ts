import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-update',
  templateUrl: './supplier-update.component.html',
  styleUrls: ['./supplier-update.component.css']
})
export class SupplierUpdateComponent {

  supplierUpdateForm:FormGroup;
  id:number;

  constructor(private formBuilder:FormBuilder, private supplierService:SupplierService,
    private toastrService:ToastrService, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.createSupplierUpdateForm();
  }

  createSupplierUpdateForm(){
    this.supplierUpdateForm = this.formBuilder.group({
      name:["", Validators.required],
      address:["", Validators.required],
      phoneNumber:[""],
      email:["", Validators.required]
    })
  }

  update(){
    if(this.supplierUpdateForm.valid){
      let supplierModel = JSON.parse(JSON.stringify(this.supplierUpdateForm.value))
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.supplierService.add(supplierModel).subscribe(response => {
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
