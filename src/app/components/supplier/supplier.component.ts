import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { DeleteSupplierRequest } from 'src/app/models/supplier/delete-supplier-request';
import { GetAllSupplierResponse } from 'src/app/models/supplier/get-all-supplier-response';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/customize-services/alertify.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent extends BaseComponent implements OnInit {

  suppliers: GetAllSupplierResponse[] = [];
  sortedSuppliers: GetAllSupplierResponse[] = [];
  enablePageButton: boolean = false;
  filterText = "";
  pageNo: number;
  pageSize: number = 5;
  sortBy: string = "name";

  constructor(private supplierService: SupplierService, private toastrService: ToastrService,
    private alertify: AlertifyService, spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute, authService: AuthService) {
    super(spinner, authService);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Spin);
    this.activatedRoute.params.subscribe(params => {
      if (params["pageNo"]) {
        this.getPageFromSupplierList()
        this.getSuppliersByPaginationAndSortingNameAsc(params["pageNo"]);
      }
      else {
        this.getPageFromSupplierList()
        this.getSuppliersByPaginationAndSortingNameAsc(1);
      }
    })
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(response => {
      this.suppliers = response.data;
      this.hideSpinner(SpinnerType.Spin);
    })
  }

  async getPageFromSupplierList() {
    this.supplierService.getSuppliersBySortingNameAsc(this.sortBy).subscribe(s => {
      this.sortedSuppliers = s.data
      this.hideSpinner(SpinnerType.Spin);
    });
    return this.sortedSuppliers;
  }

  getSuppliersByPaginationAndSortingNameAsc(page: number) {
    let x = Math.ceil(page)
    this.supplierService.getSuppliersByPaginationAndSortingNameAsc(x - 1, this.pageSize, this.sortBy)
      .subscribe(response => {
        this.suppliers = response.data;
        this.hideSpinner(SpinnerType.Spin);
        this.enablePageButton = true;
      })
  }

  deleteSupplier(deleteSupplierId: number) {
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteSupplier: DeleteSupplierRequest = { id: deleteSupplierId }
      this.supplierService.delete(deleteSupplier).subscribe(response => {
        this.toastrService.error(response.message, deleteSupplier.id.toString());
      })
    }, () => {
      return;
    })
  }
}
