import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { DeleteUserRequest } from 'src/app/models/user/delete-user-request';
import { GetAllUserResponse } from 'src/app/models/user/get-all-user-response';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/customize-services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BaseComponent implements OnInit {

  users: GetAllUserResponse[] = [];
  sortedUsers: GetAllUserResponse[] = [];
  enablePageButton: boolean = false;
  filterText = "";
  pageNo: number;
  pageSize: number = 5;
  sortBy: string = "username";

  constructor(private userService: UserService, private toastrService: ToastrService,
    private authService: AuthService, private alertify: AlertifyService, spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Spin);
    this.activatedRoute.params.subscribe(params => {
      if (params["pageNo"]) {
        this.getPageFromUserList()
        this.getUsersByPaginationAndSortingNameAsc(params["pageNo"]);
      }
      else {
        this.getPageFromUserList()
        this.getUsersByPaginationAndSortingNameAsc(1);
      }
    })
  }

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
      this.hideSpinner(SpinnerType.Spin);
    })
  }

  async getPageFromUserList() {
    this.userService.getUsersBySortingNameAsc(this.sortBy).subscribe(u => {
      this.sortedUsers = u.data
      this.hideSpinner(SpinnerType.Spin);
    });
    return this.sortedUsers;
  }

  getUsersByPaginationAndSortingNameAsc(page: number) {
    let x = Math.ceil(page)
    this.userService.getUsersByPaginationAndSortingNameAsc(x - 1, this.pageSize, this.sortBy)
      .subscribe(response => {
        this.users = response.data;
        this.hideSpinner(SpinnerType.Spin);
        this.enablePageButton = true;
      })
  }

  deleteUser(deleteUserId: number) {
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteUser: DeleteUserRequest = { id: deleteUserId }
      this.userService.delete(deleteUser).subscribe(response => {
        this.toastrService.error(response.message, deleteUser.id.toString());
      })
    }, () => {
      return;
    })
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
