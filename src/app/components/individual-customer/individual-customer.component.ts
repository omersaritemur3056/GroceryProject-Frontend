import { IndividualCustomerService } from './../../services/individual-customer.service';
import { Component, OnInit } from '@angular/core';
import { GetAllIndividualCustomerResponse } from 'src/app/models/individual-customer/get-all-individual-customer-response';
import { ToastrService } from 'ngx-toastr';
import { DeleteIndividualCustomerRequest } from 'src/app/models/individual-customer/delete-individual-customer-request';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/customize-services/alertify.service';

@Component({
  selector: 'app-individual-customer',
  templateUrl: './individual-customer.component.html',
  styleUrls: ['./individual-customer.component.css']
})
export class IndividualCustomerComponent implements OnInit {

  individualCustomers: GetAllIndividualCustomerResponse[] = [];
  filterText = "";

  constructor(private individualCustomerService:IndividualCustomerService, private toastrService:ToastrService, 
    private authService:AuthService, private alertify: AlertifyService){}

  ngOnInit(): void {
    this.getIndividualCustomers();
  }

  getIndividualCustomers(){
    this.individualCustomerService.getIndividualCustomers().subscribe(response => {
      this.individualCustomers = response.data;
    })
  }

  deleteIndividualCustomer(deleteIndividualCustomerId:number){
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteIndividualCustomer: DeleteIndividualCustomerRequest = { id: deleteIndividualCustomerId }
       this.individualCustomerService.delete(deleteIndividualCustomer).subscribe(response => {
        this.toastrService.error(response.message, deleteIndividualCustomer.id.toString());
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
