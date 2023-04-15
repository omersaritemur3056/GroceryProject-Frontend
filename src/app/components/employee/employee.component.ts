import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { GetAllEmployeeResponse } from 'src/app/models/employee/get-all-employee-response';
import { ToastrService } from 'ngx-toastr';
import { DeleteEmployeeRequest } from 'src/app/models/employee/delete-employee-request';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/customize-services/alertify.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent extends BaseComponent implements OnInit {

  employees: GetAllEmployeeResponse[] = [];
  sortedEmployees: GetAllEmployeeResponse[] = [];
  enablePageButton: boolean = false;
  filterText = "";
  pageNo: number;
  pageSize: number = 5;
  sortBy: string = "firstName";

  constructor(private employeeService: EmployeeService, private toastrService: ToastrService,
    private alertify: AlertifyService, spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute, authService: AuthService) {
    super(spinner, authService);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Spin);
    this.activatedRoute.params.subscribe(params => {
      if (params["pageNo"]) {
        this.getPageFromEmployeeList()
        this.getEmployeesByPaginationAndSortingNameAsc(params["pageNo"]);
      }
      else {
        this.getPageFromEmployeeList()
        this.getEmployeesByPaginationAndSortingNameAsc(1);
      }
    })
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(response => {
      this.employees = response.data;
      this.hideSpinner(SpinnerType.Spin);
    })
  }

  async getPageFromEmployeeList() {
    this.employeeService.getEmployeesBySortingNameAsc(this.sortBy).subscribe(e => {
      this.sortedEmployees = e.data
      this.hideSpinner(SpinnerType.Spin);
    });
    return this.sortedEmployees;
  }

  getEmployeesByPaginationAndSortingNameAsc(page: number) {
    let x = Math.ceil(page)
    this.employeeService.getEmployeesByPaginationAndSortingNameAsc(x - 1, this.pageSize, this.sortBy)
      .subscribe(response => {
        this.employees = response.data;
        this.hideSpinner(SpinnerType.Spin);
        this.enablePageButton = true;
      })
  }

  deleteEmployee(deleteEmployeeId: number) {
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteEmployee: DeleteEmployeeRequest = { id: deleteEmployeeId }
      this.employeeService.delete(deleteEmployee).subscribe(response => {
        this.toastrService.error(response.message, deleteEmployee.id.toString());
      })
    }, () => {
      return;
    })
  }
}
