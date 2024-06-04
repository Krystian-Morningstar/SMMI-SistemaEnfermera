import { Component, OnInit } from '@angular/core';

import { BasicVariablesService } from '../../services/basic-variables.service';
import { JwttokenService } from 'src/app/services/jwttoken.service';
import { UserService } from 'src/app/services/user.service';
import { enfermera } from 'src/app/models/nurseInformation.model';
import { JwtPayload } from 'jwt-decode';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent implements OnInit{

  enfermera: enfermera = {
    nombre: '',
    matricula: '',
    telefono: '',
    foto: ''
  }

  constructor(private basic: BasicVariablesService, private jwt: JwttokenService, private userService: UserService){}

  ngOnInit(): void {
    let token = this.jwt.getDecodeToken(this.jwt.getToken()!)
    let info = this.returnJSObject(token)
    this.userService.getNurseInfo(info.matricula).subscribe(response => {
      this.enfermera.nombre = `${response.nombres} ${response.apellidos}`
      this.enfermera.matricula = response.matricula
      this.enfermera.telefono = response.telefono
      this.enfermera.foto = response.url_img
    })
  }

  exit(){
    this.basic.logout()
  }

  closeTab(){
    this.basic.switchTab()
  }

  returnJSObject(jwt: JwtPayload){
    let json = JSON.stringify(jwt)
    let object = JSON.parse(json)
    return object
  }
}
