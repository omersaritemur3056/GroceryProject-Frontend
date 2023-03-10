import { IndividualCustomerService } from './../../services/individual-customer.service';
import { Component, OnInit } from '@angular/core';
import { GetAllIndividualCustomerResponse } from 'src/app/models/individual-customer/get-all-individual-customer-response';
import { ToastrService } from 'ngx-toastr';
import { DeleteIndividualCustomerRequest } from 'src/app/models/individual-customer/delete-individual-customer-request';

@Component({
  selector: 'app-individual-customer',
  templateUrl: './individual-customer.component.html',
  styleUrls: ['./individual-customer.component.css']
})
export class IndividualCustomerComponent implements OnInit {

  individualCustomers: GetAllIndividualCustomerResponse[] = [];

  constructor(private individualCustomerService:IndividualCustomerService, private toastrService:ToastrService){}

  ngOnInit(): void {
    this.getIndividualCustomers();
  }

  getIndividualCustomers(){
    this.individualCustomerService.getIndividualCustomers().subscribe(response => {
      this.individualCustomers = response.data;
    })
  }

  deleteIndividualCustomer(deleteIndividualCustomerId:number){
    if(!window.confirm("Silmek istediğinize emin misiniz?")){return;}
    let deleteCorporateCustomer:DeleteIndividualCustomerRequest = {id:deleteIndividualCustomerId}
    this.individualCustomerService.delete(deleteCorporateCustomer).subscribe(response => {
      this.toastrService.error(response.message, deleteCorporateCustomer.id.toString());
    })
  }
}
