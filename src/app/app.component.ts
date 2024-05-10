import { Component, computed } from '@angular/core';

import { BasicVariablesService } from './services/basic-variables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private basic: BasicVariablesService){}
  
  isLogged = computed(()=> this.basic.getLogStatus())
  danger = false;
  userTab = computed(()=> this.basic.getUserTabStatus())
}
