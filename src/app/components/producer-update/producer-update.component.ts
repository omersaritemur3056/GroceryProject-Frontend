import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProducerService } from 'src/app/services/producer.service';

@Component({
  selector: 'app-producer-update',
  templateUrl: './producer-update.component.html',
  styleUrls: ['./producer-update.component.css']
})
export class ProducerUpdateComponent {

  producerUpdateForm:FormGroup;
  id:number;

  constructor(private formBuilder:FormBuilder, private producerService:ProducerService,
    private toastrService:ToastrService, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.createProducerUpdateForm();
  }

  createProducerUpdateForm(){
    this.producerUpdateForm = this.formBuilder.group({
      name:["", Validators.required]
    })
  }

  update(){
    if(this.producerUpdateForm.valid){
      let supplierModel = JSON.parse(JSON.stringify(this.producerUpdateForm.value))
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.producerService.add(supplierModel).subscribe(response => {
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
