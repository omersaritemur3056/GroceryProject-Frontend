import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetAllImageResponse } from 'src/app/models/image/get-all-image-response';
import { GetAllUserResponse } from 'src/app/models/user/get-all-user-response';
import { IndividualCustomerService } from 'src/app/services/individual-customer.service';
import { PhotoService } from 'src/app/services/photo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-individual-customer-update',
  templateUrl: './individual-customer-update.component.html',
  styleUrls: ['./individual-customer-update.component.css']
})
export class IndividualCustomerUpdateComponent {

  individualCustomerUpdateForm: FormGroup;
  id: number;
  images: GetAllImageResponse[] = [];
  users: GetAllUserResponse[] = [];

  constructor(private formBuilder: FormBuilder, private individualCustomerService: IndividualCustomerService,
    private toastrService: ToastrService, private route: ActivatedRoute, private userService: UserService,
    private photoService: PhotoService) {
    this.getImagesAsync();
    this.getUsersAsync();
  }

  ngOnInit(): void {
    this.createIndividualCustomerUpdateForm();
  }

  async getUsersAsync() {
    const allUsers = await this.userService.getUsersAsync();

    this.users = allUsers.data;
  }

  async getImagesAsync() {
    const allImages = await this.photoService.getPhotosAsync();

    this.images = allImages.data;
  }

  createIndividualCustomerUpdateForm() {
    this.individualCustomerUpdateForm = this.formBuilder.group({
      address: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: ["", Validators.required],
      nationalIdentity: ["", Validators.required],
      userId: ["", Validators.required],
      imageId: ["", Validators.required]
    })
  }

  update() {
    if (this.individualCustomerUpdateForm.valid) {
      let individualCustomerModel = JSON.parse(JSON.stringify(this.individualCustomerUpdateForm.value))
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.individualCustomerService.update(this.id, individualCustomerModel).subscribe(response => {
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
