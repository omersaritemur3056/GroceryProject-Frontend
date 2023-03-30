import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
export class SupplierComponent {

  suppliers: GetAllSupplierResponse[] = [];
  filterText = "";

  constructor(private supplierService:SupplierService, private toastrService:ToastrService, 
    private authService:AuthService, private alertify: AlertifyService){}

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers(){
    this.supplierService.getSuppliers().subscribe(response => {
      this.suppliers = response.data;
    })
  }

  deleteSupplier(deleteSupplierId:number){
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteSupplier: DeleteSupplierRequest = { id: deleteSupplierId }
       this.supplierService.delete(deleteSupplier).subscribe(response => {
        this.toastrService.error(response.message, deleteSupplier.id.toString());
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
