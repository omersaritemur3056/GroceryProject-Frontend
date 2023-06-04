import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetAllImageResponse } from 'src/app/models/image/get-all-image-response';
import { GetAllUserResponse } from 'src/app/models/user/get-all-user-response';
import { IndividualCustomerService } from 'src/app/services/individual-customer.service';
import { PhotoService } from 'src/app/services/photo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-individual-customer-add',
  templateUrl: './individual-customer-add.component.html',
  styleUrls: ['./individual-customer-add.component.css']
})
export class IndividualCustomerAddComponent {

  individualCustomerAddForm: FormGroup;
  images: GetAllImageResponse[] = [];
  users: GetAllUserResponse[] = [];

  constructor(private formBuilder: FormBuilder, private individualCustomerService: IndividualCustomerService,
    private toastrService: ToastrService, private userService: UserService, private photoService: PhotoService) {
    this.getImagesAsync();
    this.getUsersAsync();
  }

  ngOnInit(): void {
    this.createIndividualCustomerAddForm();
  }

  async getUsersAsync() {
    const allUsers = await this.userService.getUsersAsync();

    this.users = allUsers.data;
  }

  async getImagesAsync() {
    const allImages = await this.photoService.getPhotosAsync();

    this.images = allImages.data;
  }

  createIndividualCustomerAddForm() {
    this.individualCustomerAddForm = this.formBuilder.group({
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

  add() {
    if (this.individualCustomerAddForm.valid) {
      let individualCustomerModel = JSON.parse(JSON.stringify(this.individualCustomerAddForm.value))
      this.individualCustomerService.add(individualCustomerModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarili")
      }, error => {
        for (let key in error.error.data) {
          this.toastrService.error(error.error.data[key], error.error.message)
        }
      });
    } else {
      this.toastrService.error("Form bilgileri eksik ya da hatali!", "Dikkat!")
    }
  }
}
