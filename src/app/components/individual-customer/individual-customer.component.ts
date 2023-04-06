import { IndividualCustomerService } from './../../services/individual-customer.service';
import { Component, OnInit } from '@angular/core';
import { GetAllIndividualCustomerResponse } from 'src/app/models/individual-customer/get-all-individual-customer-response';
import { ToastrService } from 'ngx-toastr';
import { DeleteIndividualCustomerRequest } from 'src/app/models/individual-customer/delete-individual-customer-request';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/customize-services/alertify.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-individual-customer',
  templateUrl: './individual-customer.component.html',
  styleUrls: ['./individual-customer.component.css']
})
export class IndividualCustomerComponent extends BaseComponent implements OnInit {

  individualCustomers: GetAllIndividualCustomerResponse[] = [];
  sortedIndividualCustomers: GetAllIndividualCustomerResponse[] = [];
  enablePageButton: boolean = false;
  filterText = "";
  pageNo: number;
  pageSize: number = 5;
  sortBy: string = "firstName";

  constructor(private individualCustomerService: IndividualCustomerService, private toastrService: ToastrService,
    private authService: AuthService, private alertify: AlertifyService, spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Spin);
    this.activatedRoute.params.subscribe(params => {
      if (params["pageNo"]) {
        this.getPageFromIndividualCustomerList()
        this.getIndividualCustomersByPaginationAndSortingNameAsc(params["pageNo"]);
      }
      else {
        this.getPageFromIndividualCustomerList()
        this.getIndividualCustomersByPaginationAndSortingNameAsc(1);
      }
    })
  }

  getIndividualCustomers() {
    this.individualCustomerService.getIndividualCustomers().subscribe(response => {
      this.individualCustomers = response.data;
      this.hideSpinner(SpinnerType.Spin);
    })
  }

  async getPageFromIndividualCustomerList() {
    this.individualCustomerService.getIndividualCustomersBySortingNameAsc(this.sortBy).subscribe(i => {
      this.sortedIndividualCustomers = i.data
      this.hideSpinner(SpinnerType.Spin);
    });
    return this.sortedIndividualCustomers;
  }

  getIndividualCustomersByPaginationAndSortingNameAsc(page: number) {
    let x = Math.ceil(page)
    this.individualCustomerService.getIndividualCustomersByPaginationAndSortingNameAsc(x - 1, this.pageSize, this.sortBy)
      .subscribe(response => {
        this.individualCustomers = response.data;
        this.hideSpinner(SpinnerType.Spin);
        this.enablePageButton = true;
      })
  }

  deleteIndividualCustomer(deleteIndividualCustomerId: number) {
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteIndividualCustomer: DeleteIndividualCustomerRequest = { id: deleteIndividualCustomerId }
      this.individualCustomerService.delete(deleteIndividualCustomer).subscribe(response => {
        this.toastrService.error(response.message, deleteIndividualCustomer.id.toString());
      })
    }, () => {
      return;
    })
  }

  isAdmin() {
    if (this.authService.hasAutorized().role == "ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  isModerator() {
    if (this.authService.hasAutorized().role == "MODERATOR") {
      return true;
    } else {
      return false;
    }
  }

  isEditor() {
    if (this.authService.hasAutorized().role == "EDITOR") {
      return true;
    } else {
      return false;
    }
  }
}
