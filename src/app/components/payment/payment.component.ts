import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeletePaymentRequest } from 'src/app/models/payment/delete-payment-request';
import { GetAllPaymentResponse } from 'src/app/models/payment/get-all-payment-response';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  payments: GetAllPaymentResponse[] = [];
  enablePageButton:boolean = false;
  filterText = "";
  pageSize = 10;

  constructor(private paymentService:PaymentService, private activatedRoute:ActivatedRoute, 
    private toastrService:ToastrService, private authService:AuthService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["pageNo"]){
        this.getPaymentsByPaginationAndSortingNameAsc(params["pageNo"]);
      }
      else{
        this.getPaymentsByPaginationAndSortingNameAsc(1);
      }
    })
  }

  getPayments():GetAllPaymentResponse[]{
    this.paymentService.getPayments().subscribe(response => {
      this.payments = response.data;
    })
    return this.payments;
  }

  getAllPaymentsLength():number{
    return this.payments.length;
  }

  getPaymentsBySortingNameAsc(){
    this.paymentService.getPaymentsBySortingNameAsc().subscribe(response => {
      this.payments = response.data;
      this.enablePageButton = true;
    })
  }

  getPaymentsByPaginationAndSortingNameAsc(page:number){
    let x = Math.ceil(page)
    this.paymentService.getPaymentsByPaginationAndSortingNameAsc(x - 1).subscribe(response => {
      this.payments = response.data;
      this.enablePageButton = true;
    })
  }

  deletePayment(deletePaymentId:number){
    if(!window.confirm("Silmek istediğinize emin misiniz?")){return;}
    let deletePayment:DeletePaymentRequest = {id:deletePaymentId}
    this.paymentService.delete(deletePayment).subscribe(response => {
      this.toastrService.error(response.message, deletePayment.id.toString());
    })
  }

  isAdmin(){
    if (this.authService.hasAutorized().role == "ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  isModerator(){
    if (this.authService.hasAutorized().role == "MODERATOR") {
      return true;
    } else {
      return false;
    }
  }

  isEditor(){
    if (this.authService.hasAutorized().role == "EDITOR") {
      return true;
    } else {
      return false;
    }
  }
}
