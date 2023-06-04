import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { GetAllCategoryResponse } from 'src/app/models/category/get-all-category-response';
import { GetAllProducerResponse } from 'src/app/models/producer/get-all-producer-response';
import { GetAllSupplierResponse } from 'src/app/models/supplier/get-all-supplier-response';
import { GetAllImageResponse } from 'src/app/models/image/get-all-image-response';
import { CategoryService } from 'src/app/services/category.service';
import { ProducerService } from 'src/app/services/producer.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {

  productUpdateForm: FormGroup;
  id: number;
  categories: GetAllCategoryResponse[] = [];
  producers: GetAllProducerResponse[] = [];
  suppliers: GetAllSupplierResponse[] = [];
  images: GetAllImageResponse[] = [];

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private categoryService: CategoryService,
    private toastrService: ToastrService, private route: ActivatedRoute, private producerService: ProducerService,
    private supplierService: SupplierService, private photoService: PhotoService) {
    this.getCategoriesAsync();
    this.getProducersAsync();
    this.getSuppliersAsync();
    this.getImagesAsync();
  }

  ngOnInit(): void {
    this.createProductUpdateForm();
  }

  async getCategoriesAsync() {
    const allCategories = await this.categoryService.getCategoriesAsync();

    this.categories = allCategories.data;
  }

  async getProducersAsync() {
    const allProducers = await this.producerService.getProducersAsync();

    this.producers = allProducers.data;
  }

  async getSuppliersAsync() {
    const allSuppliers = await this.supplierService.getSuppliersAsync();

    this.suppliers = allSuppliers.data;
  }

  async getImagesAsync() {
    const allImages = await this.photoService.getPhotosAsync();

    this.images = allImages.data;
  }

  createProductUpdateForm() {
    this.productUpdateForm = this.formBuilder.group({
      name: ["", Validators.required],
      price: ["", Validators.required],
      description: [""],
      productionDate: ["", Validators.required],
      expirationDate: ["", Validators.required],
      stock: ["", Validators.required],
      categoryId: ["", Validators.required],
      producerId: ["", Validators.required],
      supplierId: ["", Validators.required],
      imageIds: [[""]]
    })
  }

  update() {
    if (this.productUpdateForm.valid) {
      let productModel = JSON.parse(JSON.stringify(this.productUpdateForm.value))
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.productService.update(productModel, this.id).subscribe(response => {
          this.toastrService.success(response.message, "Başarili")
        }, error => {
          for (let key in error.error.data) {
            this.toastrService.error(error.error.data[key], error.error.message)
          }
        });
      })
    } else {
      this.toastrService.error("Form bilgileri eksik ya da hatali!", "Dikkat!")
    }
  }
}
