import { IndividualCustomerService } from './../../services/individual-customer.service';
import { Component, OnInit } from '@angular/core';
import { GetAllIndividualCustomerResponse } from 'src/app/models/individual-customer/get-all-individual-customer-response';
import { ToastrService } from 'ngx-toastr';
import { DeleteIndividualCustomerRequest } from 'src/app/models/individual-customer/delete-individual-customer-request';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-individual-customer',
  templateUrl: './individual-customer.component.html',
  styleUrls: ['./individual-customer.component.css']
})
export class IndividualCustomerComponent implements OnInit {

  individualCustomers: GetAllIndividualCustomerResponse[] = [];
  filterText = "";

  constructor(private individualCustomerService:IndividualCustomerService, private toastrService:ToastrService, 
    private authService:AuthService){}

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
