import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DangerComponent } from './views/danger/danger.component';
import { LoginComponent } from './views/login/login.component';
import { UserTabComponent } from './views/user-tab/user-tab.component';
import { HeaderComponent } from './views/header/header.component';

import { BasicVariablesService } from './services/basic-variables.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    DangerComponent, LoginComponent, UserTabComponent, HeaderComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  constructor(private basic: BasicVariablesService){}
  
  isLogged = computed(()=> this.basic.getLogStatus())
  danger = false;
  userTab = computed(()=> this.basic.getUserTabStatus())

}
