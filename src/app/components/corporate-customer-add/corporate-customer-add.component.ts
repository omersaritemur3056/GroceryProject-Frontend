import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetAllImageResponse } from 'src/app/models/image/get-all-image-response';
import { GetAllUserResponse } from 'src/app/models/user/get-all-user-response';
import { CorporateCustomerService } from 'src/app/services/corporate-customer.service';
import { PhotoService } from 'src/app/services/photo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-corporate-customer-add',
  templateUrl: './corporate-customer-add.component.html',
  styleUrls: ['./corporate-customer-add.component.css']
})
export class CorporateCustomerAddComponent {

  corporateCustomerAddForm:FormGroup;
  users: GetAllUserResponse[] = [];
  images: GetAllImageResponse[] = [];

  constructor(private formBuilder:FormBuilder, private corporateCustomerService:CorporateCustomerService,
    private toastrService:ToastrService, private photoService: PhotoService, private userService: UserService){
      this.getUsersAsync();
      this.getImagesAsync();
    }

  ngOnInit(): void {
      this.createCorporateCustomerAddForm();
  }

  async getUsersAsync() {
    const allUsers = await this.userService.getUsersAsync();

    this.users = allUsers.data;
  }

  async getImagesAsync() {
    const allImages = await this.photoService.getPhotosAsync();

    this.images = allImages.data;
  }

  createCorporateCustomerAddForm(){
    this.corporateCustomerAddForm = this.formBuilder.group({
      address:["", Validators.required],
      phoneNumber:["", Validators.required],
      companyName:["", Validators.required],
      taxNumber:["", Validators.required],
      userId:["", Validators.required],
      imageId:["", Validators.required]
    })
  }

  add(){
    if(this.corporateCustomerAddForm.valid){
      let corporateCustomerModel = JSON.parse(JSON.stringify(this.corporateCustomerAddForm.value))
      this.corporateCustomerService.add(corporateCustomerModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarili")
      }, error => {
        for(let key in error.error.data){
          this.toastrService.error(error.error.data[key], error.error.message)
        }
      });
    }else{
      this.toastrService.error("Form bilgileri eksik ya da hatali!", "Dikkat!")
    }
  }
}
