import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { isVisible, toggleTabVisibility } from './modules/userTab.model';

import { LoginComponent } from './views/login/login.component';
import { HeaderComponent } from './views/header/header.component';
import { DangerComponent } from './views/danger/danger.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, HeaderComponent, DangerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  
  isLogged = true
  danger = false;
  userTab: boolean = false

  constructor(){
    this.userTab = isVisible
  }
}
