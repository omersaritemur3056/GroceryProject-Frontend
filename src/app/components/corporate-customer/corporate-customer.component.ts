import { CorporateCustomerService } from './../../services/corporate-customer.service';
import { Component, OnInit } from '@angular/core';
import { GetAllCorporateCustomerResponse } from 'src/app/models/corporate-customer/get-all-corporate-customer-request';

@Component({
  selector: 'app-corporate-customer',
  templateUrl: './corporate-customer.component.html',
  styleUrls: ['./corporate-customer.component.css']
})
export class CorporateCustomerComponent implements OnInit {

  corporateCustomers: GetAllCorporateCustomerResponse[] = [];

  constructor(private corporateCustomerService:CorporateCustomerService){}

  ngOnInit(): void {
    this.getCorporateCustomers();
  }

  getCorporateCustomers(){
    this.corporateCustomerService.getCorporateCustomers().subscribe(response => {
      this.corporateCustomers = response.data;
    })
  }
}
