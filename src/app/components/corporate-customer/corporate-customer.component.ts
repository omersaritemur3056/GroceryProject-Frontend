import { CorporateCustomerService } from './../../services/corporate-customer.service';
import { Component, OnInit } from '@angular/core';
import { GetAllCorporateCustomerResponse } from 'src/app/models/corporate-customer/get-all-corporate-customer-request';
import { DeleteCorporateCustomerRequest } from 'src/app/models/corporate-customer/delete-corporate-customer-request';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/customize-services/alertify.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-corporate-customer',
  templateUrl: './corporate-customer.component.html',
  styleUrls: ['./corporate-customer.component.css']
})
export class CorporateCustomerComponent extends BaseComponent implements OnInit {

  corporateCustomers: GetAllCorporateCustomerResponse[] = [];
  sortedCorporateCustomers: GetAllCorporateCustomerResponse[] = [];
  enablePageButton: boolean = false;
  filterText = "";
  pageNo: number;
  pageSize: number = 5;
  sortBy: string = "companyName";

  constructor(private corporateCustomerService: CorporateCustomerService, private toastrService: ToastrService,
    private alertify: AlertifyService, spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute, authService: AuthService) {
    super(spinner, authService);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Spin);
    this.activatedRoute.params.subscribe(params => {
      if (params["pageNo"]) {
        this.getPageFromCorporateCustomerList()
        this.getCorporateCustomersByPaginationAndSortingNameAsc(params["pageNo"]);
      }
      else {
        this.getPageFromCorporateCustomerList()
        this.getCorporateCustomersByPaginationAndSortingNameAsc(1);
      }
    })
  }

  getCorporateCustomers() {
    this.corporateCustomerService.getCorporateCustomers().subscribe(response => {
      this.corporateCustomers = response.data;
      this.hideSpinner(SpinnerType.Spin);
    })
  }

  async getPageFromCorporateCustomerList() {
    this.corporateCustomerService.getCorporateCustomersBySortingNameAsc(this.sortBy).subscribe(c => {
      this.sortedCorporateCustomers = c.data
      this.hideSpinner(SpinnerType.Spin);
    });
    return this.sortedCorporateCustomers;
  }

  getCorporateCustomersByPaginationAndSortingNameAsc(page: number) {
    let x = Math.ceil(page)
    this.corporateCustomerService.getCorporateCustomersByPaginationAndSortingNameAsc(x - 1, this.pageSize, this.sortBy)
      .subscribe(response => {
        this.corporateCustomers = response.data;
        this.hideSpinner(SpinnerType.Spin);
        this.enablePageButton = true;
      })
  }

  deleteCorporateCustomer(deleteCorporateCustomerId: number) {
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteCorporateCustomer: DeleteCorporateCustomerRequest = { id: deleteCorporateCustomerId }
      this.corporateCustomerService.delete(deleteCorporateCustomer).subscribe(response => {
        this.toastrService.error(response.message, deleteCorporateCustomer.id.toString());
      })
    }, () => {
      return;
    })
  }
}
