import { Component } from '@angular/core';

import { BasicVariablesService } from '../../services/basic-variables.service';

@Component({
  selector: 'app-user-tab',
  standalone: true,
  imports: [],
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent {

  constructor(private basic: BasicVariablesService){}

  exit(){
    this.basic.logout()
  }

  closeTab(){
    this.basic.switchTab()
  }
}
