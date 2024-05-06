import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Usuario } from '../../models/user.model';

import { AuthService } from '../../services/auth.service';
import { JwttokenService } from '../../services/jwttoken.service';
import { BasicVariablesService } from '../../services/basic-variables.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  prueba = {
    matricula:"E20245M",
    contraseña:"segura123"
  }

  constructor(private auth: AuthService, private jwtService: JwttokenService, private basic: BasicVariablesService){}

  loginProcess(object: any){

    console.log(object.value)

      this.auth.login(object.value).subscribe(result => {
        if(result.message == "Sesion_Activa"){
          alert(result.message)
          this.basic.login()
          this.jwtService.setToken(result.token)
          console.log(result)
        }
        else{
          alert("los datos registrados no concuerdan con ninguna enfermera")
        }
      })
  }

}
