import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService, authService: AuthService) {
    super(spinner, authService);
  }

  haveToken() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  activateSpinner() {
    this.showSpinner(SpinnerType.ScaleMultiple);
    setTimeout(() => {
      this.hideSpinner(SpinnerType.ScaleMultiple);
    }, 2000);
  }

  logout() {
    localStorage.clear();
    location.replace("/product")
    this.hideSpinner(SpinnerType.ScaleMultiple);
  }
}
