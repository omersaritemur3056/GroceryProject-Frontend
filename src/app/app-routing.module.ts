import { CorporateCustomerComponent } from './components/corporate-customer/corporate-customer.component';
import { IndividualCustomerComponent } from './components/individual-customer/individual-customer.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProductComponent } from './components/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';

const routes: Routes = [
  {path:"", component:ProductComponent},
  {path:"product", component:ProductComponent},
  {path:"product/page/:pageNo", component:ProductComponent},
  {path:"product/category/:categoryId", component:ProductComponent},
  {path:"product/add", component:ProductAddComponent},
  {path:"category/add", component:CategoryAddComponent},
  {path:"employee", component:EmployeeComponent},
  {path:"employee/page/:pageNo", component:EmployeeComponent},
  {path:"individualcustomer", component:IndividualCustomerComponent},
  {path:"individualcustomer/page/:pageNo", component:IndividualCustomerComponent},
  {path:"corporatecustomer", component:CorporateCustomerComponent},
  {path:"corporatecustomer/page/:pageNo", component:CorporateCustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
