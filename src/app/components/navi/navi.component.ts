import { Component } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent {

  role = localStorage.getItem("roles");

  haveToken(){
    if (localStorage.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  logout(){
    localStorage.clear();
  }

  hasAdmin(){
    if (!this.role == null || this.role == "ADMIN") {
      return true;
    }
    return false;
  }
}
