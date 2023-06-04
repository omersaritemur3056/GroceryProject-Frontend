import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetAllImageResponse } from 'src/app/models/image/get-all-image-response';
import { GetAllUserResponse } from 'src/app/models/user/get-all-user-response';
import { CorporateCustomerService } from 'src/app/services/corporate-customer.service';
import { PhotoService } from 'src/app/services/photo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-corporate-customer-update',
  templateUrl: './corporate-customer-update.component.html',
  styleUrls: ['./corporate-customer-update.component.css']
})
export class CorporateCustomerUpdateComponent {

  corporateCustomerUpdateForm: FormGroup;
  id: number;
  users: GetAllUserResponse[] = [];
  images: GetAllImageResponse[] = [];

  constructor(private formBuilder: FormBuilder, private corporateCustomerService: CorporateCustomerService,
    private toastrService: ToastrService, private route: ActivatedRoute, private userService: UserService,
    private photoService: PhotoService) {
    this.getImagesAsync();
    this.getUsersAsync();
  }

  ngOnInit(): void {
    this.createCorporateCustomerUpdateForm();
  }

  async getUsersAsync() {
    const allUsers = await this.userService.getUsersAsync();

    this.users = allUsers.data;
  }

  async getImagesAsync() {
    const allImages = await this.photoService.getPhotosAsync();

    this.images = allImages.data;
  }

  createCorporateCustomerUpdateForm() {
    this.corporateCustomerUpdateForm = this.formBuilder.group({
      address: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      companyName: ["", Validators.required],
      taxNumber: ["", Validators.required],
      userId: ["", Validators.required],
      imageId: ["", Validators.required]
    })
  }

  update() {
    if (this.corporateCustomerUpdateForm.valid) {
      let corporateCustomerModel = JSON.parse(JSON.stringify(this.corporateCustomerUpdateForm.value))
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.corporateCustomerService.update(this.id, corporateCustomerModel).subscribe(response => {
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
