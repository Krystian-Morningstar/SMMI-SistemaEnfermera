import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { DangerComponent } from './views/danger/danger.component';
import { LoginComponent } from './views/login/login.component';
import { UserTabComponent } from './views/user-tab/user-tab.component';
import { HeaderComponent } from './views/header/header.component';
import { getLoggedStatus, getUserTabStatus } from './models/basicVariables.model';

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
  
  isLogged = computed(()=> getLoggedStatus())
  danger = false;
  userTab = computed(()=> getUserTabStatus())

}
