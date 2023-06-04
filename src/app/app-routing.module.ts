import { CorporateCustomerComponent } from './components/corporate-customer/corporate-customer.component';
import { IndividualCustomerComponent } from './components/individual-customer/individual-customer.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProductComponent } from './components/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { IndividualCustomerAddComponent } from './components/individual-customer-add/individual-customer-add.component';
import { IndividualCustomerUpdateComponent } from './components/individual-customer-update/individual-customer-update.component';
import { CorporateCustomerAddComponent } from './components/corporate-customer-add/corporate-customer-add.component';
import { CorporateCustomerUpdateComponent } from './components/corporate-customer-update/corporate-customer-update.component';
import { ProducerComponent } from './components/producer/producer.component';
import { ProducerAddComponent } from './components/producer-add/producer-add.component';
import { ProducerUpdateComponent } from './components/producer-update/producer-update.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SupplierAddComponent } from './components/supplier-add/supplier-add.component';
import { SupplierUpdateComponent } from './components/supplier-update/supplier-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentAddComponent } from './components/payment-add/payment-add.component';
import { PaymentUpdateComponent } from './components/payment-update/payment-update.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { ProductByIdComponent } from './components/product-by-id/product-by-id.component';

const routes: Routes = [
  {path:"", component:ProductComponent},
  {path:"product", component:ProductComponent},
  {path:"product/product/:id", component:ProductByIdComponent},
  {path:"product/page/:pageNo", component:ProductComponent},
  {path:"product/category/:categoryId", component:ProductComponent},
  {path:"product/add", component:ProductAddComponent, canActivate:[LoginGuard]},
  {path:"product/update/:id", component:ProductUpdateComponent, canActivate:[LoginGuard]},
  {path:"category/add", component:CategoryAddComponent, canActivate:[LoginGuard]},
  {path:"category/update/:id", component:CategoryUpdateComponent, canActivate:[LoginGuard]},
  {path:"employee", component:EmployeeComponent, canActivate:[LoginGuard]},
  {path:"employee/page/:pageNo", component:EmployeeComponent, canActivate:[LoginGuard]},
  {path:"employee/add", component:EmployeeAddComponent, canActivate:[LoginGuard]},
  {path:"employee/update/:id", component:EmployeeUpdateComponent, canActivate:[LoginGuard]},
  {path:"individualcustomer", component:IndividualCustomerComponent, canActivate:[LoginGuard]},
  {path:"individualcustomer/page/:pageNo", component:IndividualCustomerComponent, canActivate:[LoginGuard]},
  {path:"individualcustomer/add", component:IndividualCustomerAddComponent, canActivate:[LoginGuard]},
  {path:"individualcustomer/update/:id", component:IndividualCustomerUpdateComponent, canActivate:[LoginGuard]},
  {path:"corporatecustomer", component:CorporateCustomerComponent, canActivate:[LoginGuard]},
  {path:"corporatecustomer/page/:pageNo", component:CorporateCustomerComponent, canActivate:[LoginGuard]},
  {path:"corporatecustomer/add", component:CorporateCustomerAddComponent, canActivate:[LoginGuard]},
  {path:"corporatecustomer/update/:id", component:CorporateCustomerUpdateComponent, canActivate:[LoginGuard]},
  {path:"producer", component:ProducerComponent, canActivate:[LoginGuard]},
  {path:"producer/page/:pageNo", component:ProducerComponent, canActivate:[LoginGuard]},
  {path:"producer/add", component:ProducerAddComponent, canActivate:[LoginGuard]},
  {path:"producer/update/:id", component:ProducerUpdateComponent, canActivate:[LoginGuard]},
  {path:"supplier", component:SupplierComponent, canActivate:[LoginGuard]},
  {path:"supplier/page/:pageNo", component:SupplierComponent, canActivate:[LoginGuard]},
  {path:"supplier/add", component:SupplierAddComponent, canActivate:[LoginGuard]},
  {path:"supplier/update/:id", component:SupplierUpdateComponent, canActivate:[LoginGuard]},
  {path:"payment", component:PaymentComponent, canActivate:[LoginGuard]},
  {path:"payment/page/:pageNo", component:PaymentComponent, canActivate:[LoginGuard]},
  {path:"payment/add", component:PaymentAddComponent, canActivate:[LoginGuard]},
  {path:"payment/update/:id", component:PaymentUpdateComponent, canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"user", component:UserComponent, canActivate:[LoginGuard]},
  {path:"user/update/:id", component:UserUpdateComponent, canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
