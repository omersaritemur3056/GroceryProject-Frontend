import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { GetAllEmployeeResponse } from 'src/app/models/employee/get-all-employee-response';
import { ToastrService } from 'ngx-toastr';
import { DeleteEmployeeRequest } from 'src/app/models/employee/delete-employee-request';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/customize-services/alertify.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: GetAllEmployeeResponse[] = [];
  filterText = "";

  constructor(private employeeService:EmployeeService, private toastrService:ToastrService, 
    private authService:AuthService, private alertify: AlertifyService){}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(response => {
      this.employees = response.data;
    })
  }

  deleteEmployee(deleteEmployeeId:number){
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteEmployee: DeleteEmployeeRequest = { id: deleteEmployeeId }
       this.employeeService.delete(deleteEmployee).subscribe(response => {
        this.toastrService.error(response.message, deleteEmployee.id.toString());
      })
    }, () => {
      return;
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
