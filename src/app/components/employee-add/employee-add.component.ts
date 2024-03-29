import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetAllImageResponse } from 'src/app/models/image/get-all-image-response';
import { GetAllUserResponse } from 'src/app/models/user/get-all-user-response';
import { EmployeeService } from 'src/app/services/employee.service';
import { PhotoService } from 'src/app/services/photo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {

  employeeAddForm: FormGroup;
  users: GetAllUserResponse[] = [];
  images: GetAllImageResponse[] = [];

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private toastrService: ToastrService,
    private userService: UserService, private photoService: PhotoService) {
    this.getImagesAsync();
    this.getUsersAsync();
  }

  ngOnInit(): void {
    this.createEmployeeAddForm();
  }

  async getUsersAsync() {
    const allUsers = await this.userService.getUsersAsync();

    this.users = allUsers.data;
  }

  async getImagesAsync() {
    const allImages = await this.photoService.getPhotosAsync();

    this.images = allImages.data;
  }

  createEmployeeAddForm() {
    this.employeeAddForm = this.formBuilder.group({
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

  add() {
    if (this.employeeAddForm.valid) {
      let employeeModel = JSON.parse(JSON.stringify(this.employeeAddForm.value))
      this.employeeService.add(employeeModel).subscribe(response => {
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
