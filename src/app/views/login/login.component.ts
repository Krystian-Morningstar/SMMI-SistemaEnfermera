import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Usuario } from '../../models/user.model';
import { login } from '../../models/basicVariables.model';

import { AuthService } from '../../services/auth.service';
import { JwttokenService } from '../../services/jwttoken.service';

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

  constructor(private auth: AuthService, private jwtService: JwttokenService){}

  loginProcess(object: any){

    console.log(object.value)

      this.auth.login(this.prueba).subscribe(result => {
        if(result.message == "Sesion_Activa"){
          alert(result.message)
          login()
          this.jwtService.setToken(result.token)
          console.log(result)
        }
        else{
          alert("los datos registrados no concuerdan con ninguna enfermera")
        }
      })
  }

  validateMatricula(matricula: string): boolean {
    // Validar la matrícula 
    const regex = /^A\d{2}\d{3}$/; 
    return regex.test(matricula);
  }

  validatePassword(password: string): boolean {
    // Validar  una contraseña segura
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }
}
