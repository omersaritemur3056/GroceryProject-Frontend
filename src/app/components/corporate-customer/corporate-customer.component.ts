import { CorporateCustomerService } from './../../services/corporate-customer.service';
import { Component, OnInit } from '@angular/core';
import { GetAllCorporateCustomerResponse } from 'src/app/models/corporate-customer/get-all-corporate-customer-request';
import { DeleteCorporateCustomerRequest } from 'src/app/models/corporate-customer/delete-corporate-customer-request';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/customize-services/alertify.service';

@Component({
  selector: 'app-corporate-customer',
  templateUrl: './corporate-customer.component.html',
  styleUrls: ['./corporate-customer.component.css']
})
export class CorporateCustomerComponent implements OnInit {

  corporateCustomers: GetAllCorporateCustomerResponse[] = [];
  filterText = "";

  constructor(private corporateCustomerService:CorporateCustomerService, private toastrService:ToastrService, 
    private authService:AuthService, private alertify: AlertifyService){}

  ngOnInit(): void {
    this.getCorporateCustomers();
  }

  getCorporateCustomers(){
    this.corporateCustomerService.getCorporateCustomers().subscribe(response => {
      this.corporateCustomers = response.data;
    })
  }

  deleteCorporateCustomer(deleteCorporateCustomerId:number){
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteCorporateCustomer: DeleteCorporateCustomerRequest = { id: deleteCorporateCustomerId }
       this.corporateCustomerService.delete(deleteCorporateCustomer).subscribe(response => {
        this.toastrService.error(response.message, deleteCorporateCustomer.id.toString());
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
