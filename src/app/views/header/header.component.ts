import { Component } from '@angular/core';
import { switchTab } from '../../models/basicVariables.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  openTab(){
    switchTab()
  }
}
