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

const routes: Routes = [
  {path:"", component:ProductComponent},
  {path:"product", component:ProductComponent},
  {path:"product/page/:pageNo", component:ProductComponent},
  {path:"product/category/:categoryId", component:ProductComponent},
  {path:"product/add", component:ProductAddComponent},
  {path:"product/update/:id", component:ProductUpdateComponent},
  {path:"category/add", component:CategoryAddComponent},
  {path:"category/update/:id", component:CategoryUpdateComponent},
  {path:"employee", component:EmployeeComponent},
  {path:"employee/page/:pageNo", component:EmployeeComponent},
  {path:"employee/add", component:EmployeeAddComponent},
  {path:"employee/update/:id", component:EmployeeUpdateComponent},
  {path:"individualcustomer", component:IndividualCustomerComponent},
  {path:"individualcustomer/page/:pageNo", component:IndividualCustomerComponent},
  {path:"individualcustomer/add", component:IndividualCustomerAddComponent},
  {path:"individualcustomer/update/:id", component:IndividualCustomerUpdateComponent},
  {path:"corporatecustomer", component:CorporateCustomerComponent},
  {path:"corporatecustomer/page/:pageNo", component:CorporateCustomerComponent},
  {path:"corporatecustomer/add", component:CorporateCustomerAddComponent},
  {path:"corporatecustomer/update/:id", component:CorporateCustomerUpdateComponent},
  {path:"producer", component:ProducerComponent},
  {path:"producer/page/:pageNo", component:ProducerComponent},
  {path:"producer/add", component:ProducerAddComponent},
  {path:"producer/update/:id", component:ProducerUpdateComponent},
  {path:"supplier", component:SupplierComponent},
  {path:"supplier/page/:pageNo", component:SupplierComponent},
  {path:"supplier/add", component:SupplierAddComponent},
  {path:"supplier/update/:id", component:SupplierUpdateComponent},
  {path:"payment", component:PaymentComponent},
  {path:"payment/page/:pageNo", component:PaymentComponent},
  {path:"payment/add", component:PaymentAddComponent},
  {path:"payment/update/:id", component:PaymentUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
