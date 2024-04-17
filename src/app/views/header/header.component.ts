import { Component } from '@angular/core';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserDetailsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  user: boolean = false;

  userTab(){
    this.user = true;
  }
}
