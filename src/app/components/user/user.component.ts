import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeleteUserRequest } from 'src/app/models/user/delete-user-request';
import { GetAllUserResponse } from 'src/app/models/user/get-all-user-response';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users: GetAllUserResponse[] = [];
  filterText = "";

  constructor(private userService:UserService, private toastrService:ToastrService, 
    private authService:AuthService){}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
    })
  }

  deleteUser(deleteUserId:number){
    if(!window.confirm("Silmek istediğinize emin misiniz?")){return;}
    let deleteUser:DeleteUserRequest = {id:deleteUserId}
    this.userService.delete(deleteUser).subscribe(response => {
      this.toastrService.error(response.message, deleteUser.id.toString());
    })
  }

  isAdmin(){
    if (this.authService.hasAutorized().role == "ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  isModerator(){
    if (this.authService.hasAutorized().role == "MODERATOR") {
      return true;
    } else {
      return false;
    }
  }

  isEditor(){
    if (this.authService.hasAutorized().role == "EDITOR") {
      return true;
    } else {
      return false;
    }
  }
}
