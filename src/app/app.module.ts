import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

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
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { JwtModule } from '@auth0/angular-jwt';
import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { MathRoundPipe } from './pipes/math-round.pipe';
import { ProductByIdComponent } from './components/product-by-id/product-by-id.component';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { FullNameFilterPipe } from './pipes/full-name-filter.pipe';
import { FirstNameFilterPipe } from './pipes/first-name-filter.pipe';
import { CompanyNameFilterPipe } from './pipes/company-name-filter.pipe';


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
    FooterComponent,
    ImageUploadComponent,
    MathRoundPipe,
    ProductByIdComponent,
    UserFilterPipe,
    FullNameFilterPipe,
    FirstNameFilterPipe,
    CompanyNameFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("token"),
        allowedDomains: ["localhost:8080"]
      }
    }),
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("701530053355-l0n5pnqifn4qeq1h714immqeiuomb92b.apps.googleusercontent.com")
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("2395539210626739")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
