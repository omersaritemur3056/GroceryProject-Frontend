import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css']
})
export class SupplierAddComponent {

  supplierAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private supplierService:SupplierService,
    private toastrService:ToastrService){}

  ngOnInit(): void {
      this.createSupplierAddForm();
  }

  createSupplierAddForm(){
    this.supplierAddForm = this.formBuilder.group({
      name:["", Validators.required],
      address:["", Validators.required],
      phoneNumber:[""],
      email:["", Validators.required]
    })
  }

  add(){
    if(this.supplierAddForm.valid){
      let supllierModel = JSON.parse(JSON.stringify(this.supplierAddForm.value))
      this.supplierService.add(supllierModel).subscribe(response => {
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
