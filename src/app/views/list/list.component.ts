import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PacientsService } from '../../services/pacients.service';
import { JwttokenService } from '../../services/jwttoken.service';
import { JwtPayload } from 'jwt-decode';
import { BasicVariablesService } from '../../services/basic-variables.service';
import { SensorsService } from '../../services/sensors.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  allRooms: any = []
  sensorsList: any = []

  blankspace: boolean = false
  loading: boolean = true
  
  constructor(
    private router: Router, 
    rooms: PacientsService,
    sensors: SensorsService,
    jwtService: JwttokenService, 
    basic: BasicVariablesService
    ) {
    const jwt = jwtService.getToken()
    if(jwt == null){
      alert("El token guardado ya ha expirado")
      basic.logout()
    }
    else{
      const jwtDecoded = jwtService.getDecodeToken(jwt!)
      const jwtObject = this.returnJSObject(jwtDecoded)
      const tuition = jwtObject.matricula

      this.setSensors(sensors)
      this.setRooms(rooms, tuition)
    }
  }

  returnJSObject(jwt: JwtPayload){
    let json = JSON.stringify(jwt)
    let object = JSON.parse(json)
    return object
  }

  getAllRooms(roomService: PacientsService, tuition: string){
    return new Promise((resolve, reject) => {
      roomService.getRooms(tuition).subscribe(result => {
        console.log(result);
        let allRooms: any[] = result
        if(allRooms.length==0){
          reject(new Error("No existen pacientes encargados a la enfermera actual"))
        }
        setTimeout(()=>{
          resolve(allRooms)
        }, 3000)
      })
    })
  }

  getSensors(sensorsService: SensorsService){
    return new Promise((resolve, reject) => {
      sensorsService.getSensors().subscribe(result => {
        console.log(result);
        let allSensors: any[] = result
        if(allSensors.length==0){
          reject(new Error("No hay sensores registrados"))
        }
        setTimeout(()=>{
          resolve(allSensors)
        }, 1500)
      })
    })
  }

  async setRooms(rooms: PacientsService, tuition: string){
    this.allRooms = await this.getAllRooms(rooms, tuition)
    this.blankspace = (this.allRooms.length == 0)
    console.log(this.blankspace);
    this.loading = false
  }

  async setSensors(sensors: SensorsService){
    this.sensorsList = await this.getSensors(sensors)
  }

  showDetails(id: number){
    this.router.navigateByUrl('/details/'+id)
  }
}
