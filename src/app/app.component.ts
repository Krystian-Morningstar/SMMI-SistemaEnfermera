import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { DangerComponent } from './views/danger/danger.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, DangerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  
  isLogged = false;
  danger = false;
  userTab = false;

  openTab(){
    this.userTab = true;
  }

  closeTab(){
    this.userTab = false;
  }

  exit(){
    this.isLogged = false;
  }
}
