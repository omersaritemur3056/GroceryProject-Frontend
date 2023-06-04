import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetAllCategoryResponse } from 'src/app/models/category/get-all-category-response';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { FileUploadOptions } from '../image-upload/image-upload.component';
import { GetAllProducerResponse } from 'src/app/models/producer/get-all-producer-response';
import { GetAllSupplierResponse } from 'src/app/models/supplier/get-all-supplier-response';
import { ProducerService } from 'src/app/services/producer.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { GetAllImageResponse } from 'src/app/models/image/get-all-image-response';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm: FormGroup;
  categories: GetAllCategoryResponse[] = [];
  producers: GetAllProducerResponse[] = [];
  suppliers: GetAllSupplierResponse[] = [];
  images: GetAllImageResponse[] = [];

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    explanation: "Resimleri sürükleyin veya seçin...",
    accept: ".png, .jpg, .jpeg, .json"
  }

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private toastrService: ToastrService,
    private categoryService: CategoryService, private producerService: ProducerService, private supplierService: SupplierService,
    private photoService: PhotoService) {
    this.getCategoriesAsync();
    this.getProducersAsync();
    this.getSuppliersAsync();
    this.getImagesAsync();
  }

  ngOnInit(): void {
    this.createProductAddForm();
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

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      price: ["", Validators.required],
      description: [""],
      productionDate: ["", Validators.required],
      expirationDate: ["", Validators.required],
      stock: ["", Validators.required],
      categoryId: ["", Validators.required],
      producerId: ["", Validators.required],
      supplierId: ["", Validators.required]
      //imageIds: [[""]]
    })
  }

  add() {
    if (this.productAddForm.valid) {
      let productModel = JSON.parse(JSON.stringify(this.productAddForm.value))
      this.productService.add(productModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarili")
      }, error => {
        for (let key in error.error.data) {
          this.toastrService.error(error.error.data[key], "Başarısız!")
        }
      });
    } else {
      this.toastrService.error("Form bilgileri eksik ya da hatali!", "Dikkat!")
    }
  }
}
