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
  sortedProducts: GetAllProductResponse[] = [];
  enablePageButton: boolean = false;
  filterText = "";
  pageNo: number;
  pageSize: number = 5;
  sortBy: string = "name";

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService, private cartService: CartService, private authService: AuthService,
    spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Spin);
    this.activatedRoute.params.subscribe(params => {
      if (params["categoryId"]) {
        this.getPageFromProductList()
        this.getProductsByCategory(params["categoryId"]);
      }
      else if (params["pageNo"]) {
        this.getPageFromProductList()
        this.getProductsByPaginationAndSortingNameAsc(params["pageNo"]);
      }
      else {
        this.getPageFromProductList()
        this.getProductsByPaginationAndSortingNameAsc(1);
      }
    })
  }

  async getPageFromProductList() {
    this.productService.getProductsBySortingNameAsc(this.sortBy).subscribe(p => {
      this.sortedProducts = p.data
      this.hideSpinner(SpinnerType.Spin);
    });
    return this.sortedProducts;
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
