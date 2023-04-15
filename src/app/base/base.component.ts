import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../services/auth.service";

export class BaseComponent {

  constructor(private spinner: NgxSpinnerService, private authService: AuthService) { }

  showSpinner(spinnerNameType: SpinnerType) {
    this.spinner.show(spinnerNameType);
  }

  hideSpinner(spinnerNameType: SpinnerType) {
    this.spinner.hide(spinnerNameType);
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

  isUser() {
    if (this.authService.hasAutorized().role == "USER") {
      return true;
    } else {
      return false;
    }
  }
}

export enum SpinnerType {
  Spin = "spin",
  ScaleMultiple = "scale-multiple"
}