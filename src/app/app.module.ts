import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { NaviComponent } from './components/navi/navi.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { IndividualCustomerComponent } from './components/individual-customer/individual-customer.component';
import { CorporateCustomerComponent } from './components/corporate-customer/corporate-customer.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';

import { ToastrModule } from 'ngx-toastr';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { PagingPipe } from './pipes/paging.pipe';
import { CorporateCustomerUpdateComponent } from './components/corporate-customer-update/corporate-customer-update.component';
import { IndividualCustomerUpdateComponent } from './components/individual-customer-update/individual-customer-update.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { ProducerComponent } from './components/producer/producer.component';
import { ProducerAddComponent } from './components/producer-add/producer-add.component';
import { ProducerUpdateComponent } from './components/producer-update/producer-update.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SupplierAddComponent } from './components/supplier-add/supplier-add.component';
import { SupplierUpdateComponent } from './components/supplier-update/supplier-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentAddComponent } from './components/payment-add/payment-add.component';
import { PaymentUpdateComponent } from './components/payment-update/payment-update.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { IndividualCustomerAddComponent } from './components/individual-customer-add/individual-customer-add.component';
import { CorporateCustomerAddComponent } from './components/corporate-customer-add/corporate-customer-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    NaviComponent,
    EmployeeComponent,
    IndividualCustomerComponent,
    CorporateCustomerComponent,
    VatAddedPipe,
    FilterPipe,
    CartSummaryComponent,
    ProductAddComponent,
    CategoryAddComponent,
    CategoryUpdateComponent,
    ProductUpdateComponent,
    PagingPipe,
    CorporateCustomerUpdateComponent,
    IndividualCustomerUpdateComponent,
    EmployeeUpdateComponent,
    ProducerComponent,
    ProducerAddComponent,
    ProducerUpdateComponent,
    SupplierComponent,
    SupplierAddComponent,
    SupplierUpdateComponent,
    PaymentComponent,
    PaymentAddComponent,
    PaymentUpdateComponent,
    EmployeeAddComponent,
    IndividualCustomerAddComponent,
    CorporateCustomerAddComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    UserUpdateComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
