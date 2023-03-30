import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { GetAllProductResponse } from 'src/app/models/product/get-all-product-response';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteProductRequest } from 'src/app/models/product/delete-product-request';
import { AuthService } from 'src/app/services/auth.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/customize-services/alertify.service';
//declare var alertify: any

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends BaseComponent implements OnInit {

  products: GetAllProductResponse[] = [];
  pagedProducts: number[] = [];
  enablePageButton: boolean = false;
  filterText = "";
  pageNo: number;
  pageSize: number = 10;
  sortBy: string = "name";
  currentPageNumber: number;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService, private cartService: CartService, private authService: AuthService,
    spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Spin);
    this.activatedRoute.params.subscribe(params => {
      if (params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"]);
      }
      else if (params["pageNo"]) {
        this.getProductsByPaginationAndSortingNameAsc(params["pageNo"]);
      }
      else {
        this.getProductsByPaginationAndSortingNameAsc(1);
      }
    })
  }

  getProducts() {
    this.productService.getProductsBySortingNameAsc(this.sortBy).subscribe(response => {
      this.products = response.data;
      this.hideSpinner(SpinnerType.Spin);
      this.enablePageButton = true;
    })
  }

  getProductsByPaginationAndSortingNameAsc(page: number) {
    let x = Math.ceil(page)
    this.productService.getProductsByPaginationAndSortingNameAsc(x - 1, this.pageSize, this.sortBy)
      .subscribe(response => {
        this.products = response.data;
        this.hideSpinner(SpinnerType.Spin);
        this.enablePageButton = true;
      })
  }

  getProductsByCategory(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe(response => {
      this.products = response.data;
      this.hideSpinner(SpinnerType.Spin);
    })
  }

  deleteProduct(deleteProductId: number) {
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteProduct: DeleteProductRequest = { id: deleteProductId }
       this.productService.delete(deleteProduct).subscribe(response => {
        this.toastrService.error(response.message, deleteProduct.id.toString());
      })
    }, () => {
      return;
    })
  }

  addToCart(product: GetAllProductResponse) {
    if (localStorage.length < 1) {
      this.toastrService.error("Sisteme giriş yapmalısınız!")
      return;
    }
    this.toastrService.success("Sepete eklendi", product.name)
    this.cartService.addToCart(product);
  }

  isAdmin() {
    if (this.authService.hasAutorized().role == "ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  isModerator() {
    if (this.authService.hasAutorized().role == "MODERATOR") {
      return true;
    } else {
      return false;
    }
  }

  isEditor() {
    if (this.authService.hasAutorized().role == "EDITOR") {
      return true;
    } else {
      return false;
    }
  }
}
