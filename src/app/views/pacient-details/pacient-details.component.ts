import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
import { JwttokenService } from '../../services/jwttoken.service';
import { BasicVariablesService } from '../../services/basic-variables.service';
import { PacientsService } from '../../services/pacients.service';

@Component({
  selector: 'app-pacient-details',
  templateUrl: './pacient-details.component.html',
  styleUrls: ['./pacient-details.component.css']
})
export class PacientDetailsComponent {
  pacientDetails: any
  id: string = '';

  loading: boolean = true

  constructor(private route: ActivatedRoute, private ruta: Router, private jwtService: JwttokenService, private basic: BasicVariablesService, private rooms: PacientsService){
    const jwt = jwtService.getToken()
    if(jwt == null){
      alert("El token guardado ya ha expirado")
      basic.logout
    }
    else{
      this.id = route.snapshot.params['id']
      this.setDetails(rooms, this.id)
    }
  }

  getDetails(pacientService: PacientsService, id: string){
    return new Promise((resolve, reject)=> {
      pacientService.getPacientDetails(id).subscribe(result => {
        console.log(result)
        let details: any[] = result
        setTimeout(()=> {
          resolve(details)
        }, 3500)
      })
    })
  }

  async setDetails(service: PacientsService, id: string){
    this.getDetails(service, id)
      .then(result => {
        this.pacientDetails = result
        this.loading = false
      })
      .catch(err => {
        console.log(err.message)
        alert("ha ocurrido un problema: "+err.message)
      })
  }

  showPrescriptions(){
    this.ruta.navigateByUrl('/prescriptions/'+this.pacientDetails.id)
  }

  showReports(){
    this.ruta.navigateByUrl('/reports/'+this.pacientDetails.id)
  }
}
