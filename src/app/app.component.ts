import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DangerComponent } from './views/danger/danger.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DangerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  
  isLogged = true;
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
