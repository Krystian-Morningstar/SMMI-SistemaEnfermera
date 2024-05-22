import { Component, OnInit, computed } from '@angular/core';

import { BasicVariablesService } from './services/basic-variables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private basic: BasicVariablesService){}

  ngOnInit(): void {
    
  }
  
  isLogged = computed(()=> this.basic.getLogStatus())
  danger = false;
  userTab = computed(()=> this.basic.getUserTabStatus())

  
}
