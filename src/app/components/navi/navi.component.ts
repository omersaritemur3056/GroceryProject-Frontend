import { Component } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent {

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
}
