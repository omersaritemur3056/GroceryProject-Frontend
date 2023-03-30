import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent extends BaseComponent{

  constructor(private authService:AuthService, spinner: NgxSpinnerService){
    super(spinner);
  }

  haveToken(){
    if (localStorage.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  activateSpinner(){
    this.showSpinner(SpinnerType.ScaleMultiple);
    setTimeout(() => {
      this.hideSpinner(SpinnerType.ScaleMultiple);
    }, 2000);
  }

  logout(){
    localStorage.clear();
    location.replace("/product")
    this.hideSpinner(SpinnerType.ScaleMultiple);
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
