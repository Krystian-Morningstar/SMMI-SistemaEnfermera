import { Component, OnInit, computed } from '@angular/core';

import { BasicVariablesService } from './services/basic-variables.service';
import { JwttokenService } from './services/jwttoken.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private basic: BasicVariablesService, private jwtService: JwttokenService){}

  isLogged = computed(()=> this.basic.getLogStatus())
  danger = false;
  userTab = computed(()=> this.basic.getUserTabStatus())

  ngOnInit(): void {
    const jwt = this.jwtService.getToken()
    if(jwt != null){
      this.basic.login()
    }
  }
  
}
