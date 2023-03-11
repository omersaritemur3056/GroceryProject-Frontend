import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-update',
  templateUrl: './payment-update.component.html',
  styleUrls: ['./payment-update.component.css']
})
export class PaymentUpdateComponent {

  paymentUpdateForm:FormGroup;
  id:number;

  constructor(private formBuilder:FormBuilder, private paymentService:PaymentService,
    private toastrService:ToastrService, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.createPaymentUpdateForm();
  }

  createPaymentUpdateForm(){
    this.paymentUpdateForm = this.formBuilder.group({
      cardNumber:["", Validators.required],
      fullName:["", Validators.required],
      cardExpirationYear:["", Validators.required],
      cardExpirationMonth:["", Validators.required],
      cardCvv:["", Validators.required],
      balance:["", Validators.required]
    })
  }

  update(){
    if(this.paymentUpdateForm.valid){
      let paymentModel = JSON.parse(JSON.stringify(this.paymentUpdateForm.value))
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.paymentService.add(paymentModel).subscribe(response => {
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
