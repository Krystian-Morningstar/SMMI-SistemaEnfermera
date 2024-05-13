import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { JwttokenService } from '../../services/jwttoken.service';
import { BasicVariablesService } from '../../services/basic-variables.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario = {
    tuition: "",
    password: ""
  }

  prueba = {
    matricula:"E90245M",
    contraseña:"segura123"
  }

  constructor(private auth: AuthService, private jwtService: JwttokenService, private basic: BasicVariablesService){}

  onSubmit(){

    // if (!this.usuario.tuition|| !this.usuario.password) {
    //   this.showToast('blankFieldsToast');
    //   return; 
    // }

      this.auth.login(this.prueba).subscribe(result => {
        if(result.message == "Sesion_Activa"){
          this.basic.login()
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
    const regex = /^M\d{2}\d{3}$/; 
    return regex.test(matricula);
  }

  validatePassword(password: string): boolean {
    // Validar  una contraseña segura
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }

  showToast(toastId: string) {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000); 
    }
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }

}
