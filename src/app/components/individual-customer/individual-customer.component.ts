import { IndividualCustomerService } from './../../services/individual-customer.service';
import { Component, OnInit } from '@angular/core';
import { GetAllIndividualCustomerResponse } from 'src/app/models/individual-customer/get-all-individual-customer';

@Component({
  selector: 'app-individual-customer',
  templateUrl: './individual-customer.component.html',
  styleUrls: ['./individual-customer.component.css']
})
export class IndividualCustomerComponent implements OnInit {

  individualCustomers: GetAllIndividualCustomerResponse[] = [];

  constructor(private individualCustomerService:IndividualCustomerService){}

  ngOnInit(): void {
    this.getIndividualCustomers();
  }

  getIndividualCustomers(){
    this.individualCustomerService.getIndividualCustomers().subscribe(response => {
      this.individualCustomers = response.data;
    })
  }
}
