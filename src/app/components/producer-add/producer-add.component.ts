import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProducerService } from 'src/app/services/producer.service';

@Component({
  selector: 'app-producer-add',
  templateUrl: './producer-add.component.html',
  styleUrls: ['./producer-add.component.css']
})
export class ProducerAddComponent {

  producerAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private producerService:ProducerService,
    private toastrService:ToastrService){}

  ngOnInit(): void {
      this.createProducerAddForm();
  }

  createProducerAddForm(){
    this.producerAddForm = this.formBuilder.group({
      name:["", Validators.required]
    })
  }

  add(){
    if(this.producerAddForm.valid){
      let producerModel = JSON.parse(JSON.stringify(this.producerAddForm.value))
      this.producerService.add(producerModel).subscribe(response => {
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
