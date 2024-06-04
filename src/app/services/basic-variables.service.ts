import { Injectable } from '@angular/core';
import { signal } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class BasicVariablesService {

  private isLogged = signal(false)
  private userTab = signal(false)

  constructor() { }

  getLogStatus(): boolean{
    return this.isLogged()
  }

  getUserTabStatus(): boolean{
    return this.userTab()
  }

  login(){
    this.isLogged.set(true)
  }

  logout(){
    this.isLogged.set(false)
  }

  switchTab(){
    this.userTab.set(!this.userTab())
  }
}