import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { DeletePaymentRequest } from 'src/app/models/payment/delete-payment-request';
import { GetAllPaymentResponse } from 'src/app/models/payment/get-all-payment-response';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/customize-services/alertify.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent extends BaseComponent implements OnInit {

  payments: GetAllPaymentResponse[] = [];
  sortedPayments: GetAllPaymentResponse[] = [];
  enablePageButton: boolean = false;
  filterText = "";
  pageNo: number;
  pageSize: number = 10;
  sortBy: string = "fullName";

  constructor(private paymentService: PaymentService, private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService, private alertify: AlertifyService,
    spinner: NgxSpinnerService, authService: AuthService) {
    super(spinner, authService);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Spin);
    this.activatedRoute.params.subscribe(params => {
      if (params["pageNo"]) {
        this.getPageFromPaymentList()
        this.getPaymentsByPaginationAndSortingNameAsc(params["pageNo"]);
      }
      else {
        this.getPageFromPaymentList()
        this.getPaymentsByPaginationAndSortingNameAsc(1);
      }
    })
  }

  async getPageFromPaymentList() {
    this.paymentService.getPaymentsBySortingNameAsc(this.sortBy).subscribe(p => {
      this.sortedPayments = p.data
      this.hideSpinner(SpinnerType.Spin);
    });
    return this.sortedPayments;
  }

  getPayments(): GetAllPaymentResponse[] {
    this.paymentService.getPayments().subscribe(response => {
      this.payments = response.data;
      this.hideSpinner(SpinnerType.Spin);
    })
    return this.payments;
  }

  getPaymentsBySortingNameAsc() {
    this.paymentService.getPaymentsBySortingNameAsc(this.sortBy).subscribe(response => {
      this.payments = response.data;
      this.hideSpinner(SpinnerType.Spin);
      this.enablePageButton = true;
    })
  }

  getPaymentsByPaginationAndSortingNameAsc(page: number) {
    let x = Math.ceil(page)
    this.paymentService.getPaymentsByPaginationAndSortingNameAsc(x - 1, this.pageSize, this.sortBy)
      .subscribe(response => {
        this.payments = response.data;
        this.hideSpinner(SpinnerType.Spin);
        this.enablePageButton = true;
      })
  }

  deletePayment(deletePaymentId: number) {
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deletePayment: DeletePaymentRequest = { id: deletePaymentId }
      this.paymentService.delete(deletePayment).subscribe(response => {
        this.toastrService.error(response.message, deletePayment.id.toString());
      })
    }, () => {
      return;
    })
  }
}
