import { Component } from '@angular/core';

import { logout, switchTab } from '../../modules/appModel.model';

@Component({
  selector: 'app-user-tab',
  standalone: true,
  imports: [],
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent {

  exit(){
    logout()
  }

  closeTab(){
    switchTab()
  }
}
