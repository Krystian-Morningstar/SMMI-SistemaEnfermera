import { Component } from '@angular/core';
import { BasicVariablesService } from '../../services/basic-variables.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private basic: BasicVariablesService){}

  openTab(){
    this.basic.switchTab()
  }
}
