import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { GetAllEmployeeResponse } from 'src/app/models/employee/get-all-employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: GetAllEmployeeResponse[] = [];

  constructor(private employeeService:EmployeeService){}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(response => {
      this.employees = response.data;
    })
  }
}
