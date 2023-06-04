import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetAllImageResponse } from 'src/app/models/image/get-all-image-response';
import { GetAllUserResponse } from 'src/app/models/user/get-all-user-response';
import { EmployeeService } from 'src/app/services/employee.service';
import { PhotoService } from 'src/app/services/photo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent {

  employeeUpdateForm: FormGroup;
  id: number;
  users: GetAllUserResponse[] = [];
  images: GetAllImageResponse[] = [];

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private userService: UserService,
    private toastrService: ToastrService, private route: ActivatedRoute, private photoService: PhotoService) {
    this.getImagesAsync();
    this.getUsersAsync();
  }

  ngOnInit(): void {
    this.createSupplierUpdateForm();
  }

  async getUsersAsync() {
    const allUsers = await this.userService.getUsersAsync();

    this.users = allUsers.data;
  }

  async getImagesAsync() {
    const allImages = await this.photoService.getPhotosAsync();

    this.images = allImages.data;
  }

  createSupplierUpdateForm() {
    this.employeeUpdateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: ["", Validators.required],
      nationalIdentity: ["", Validators.required],
      birthYear: ["", Validators.required],
      nationality: ["", Validators.required],
      salary: ["", Validators.required],
      userId: ["", Validators.required],
      imageId: ["", Validators.required]
    })
  }

  update() {
    if (this.employeeUpdateForm.valid) {
      let employeeModel = JSON.parse(JSON.stringify(this.employeeUpdateForm.value))
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.employeeService.update(this.id, employeeModel).subscribe(response => {
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
