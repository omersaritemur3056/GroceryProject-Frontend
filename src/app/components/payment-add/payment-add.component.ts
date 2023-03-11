import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css']
})
export class PaymentAddComponent {

  paymentAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private paymentService:PaymentService,
    private toastrService:ToastrService){}

  ngOnInit(): void {
      this.createPaymentAddForm();
  }

  createPaymentAddForm(){
    this.paymentAddForm = this.formBuilder.group({
      cardNumber:["", Validators.required],
      fullName:["", Validators.required],
      cardExpirationYear:["", Validators.required],
      cardExpirationMonth:["", Validators.required],
      cardCvv:["", Validators.required],
      balance:["", Validators.required]
    })
  }

  add(){
    if(this.paymentAddForm.valid){
      let paymentModel = JSON.parse(JSON.stringify(this.paymentAddForm.value))
      this.paymentService.add(paymentModel).subscribe(response => {
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
