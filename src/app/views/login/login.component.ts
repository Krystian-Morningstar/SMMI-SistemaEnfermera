import { Component } from '@angular/core';
import { login } from '../../modules/appModel.model';
import { AuthService } from '../../services/auth.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private auth: AuthService){}

  loginProcess(object: any){
    console.log(object)
    this.auth.login(object.value).subscribe(result => {
      if(result.message == "Sesion_Activa"){
        console.log("sesión válida")
        alert(result.message)
        login()
      }
      else{
        alert("los datos registrados no son correctos")
      }
    })
  }
}
