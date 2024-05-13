import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtPayload } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { IMqttMessage } from 'ngx-mqtt';
import { Signal } from '@angular/core';

import { MqttSensorsService } from 'src/app/services/mqtt-sensors.service';
import { PacientsService } from '../../services/pacients.service';
import { JwttokenService } from '../../services/jwttoken.service';
import { BasicVariablesService } from '../../services/basic-variables.service';
import { SensorsService } from '../../services/sensors.service';
import { sensores } from 'src/app/models/sensores.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  allRooms: any[] = []
  sensorsList: any[] = []

  mapSensors: Map<string, string> = new Map()

  subscription: Subscription | undefined

  blankspace: boolean = false
  loading: boolean = true
  
  constructor(
    private readonly eventMqtt: MqttSensorsService,
    private router: Router, 
    private rooms: PacientsService,
    private sensors: SensorsService,
    private jwtService: JwttokenService, 
    private basic: BasicVariablesService
    ) 
    {}

  ngOnInit(): void {
    const jwt = this.jwtService.getToken()
    if(jwt == null){
      alert("El token guardado ya ha expirado")
      this.basic.logout()
    }
    else{
      const jwtDecoded = this.jwtService.getDecodeToken(jwt!)
      const jwtObject = this.returnJSObject(jwtDecoded)
      const tuition = jwtObject.matricula

      this.setSensors(this.sensors)
      this.setRooms(this.rooms, tuition)

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
        setTimeout(()=>{
          console.log(result);
          let allRooms: any[] = result
          if(allRooms.length==0){
            reject(new Error("No existen pacientes encargados a la enfermera actual"))
          }
          else{
            resolve(allRooms)
          }
        }, 2000)
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
        }, 1000)
      })
    })
  }

  async setRooms(rooms: PacientsService, tuition: string){
    await this.getAllRooms(rooms, tuition)
    .then((response: any) => {
      this.allRooms = response
      this.blankspace = (this.allRooms.length == 0)
      this.loading = false
      this.getRoomSensors()
    })
    .catch((err)=>console.log("Error al mostrar datos: ", err))
  }

  async setSensors(sensors: SensorsService){
    let response: any = await this.getSensors(sensors)
    this.sensorsList = response
  }

  showDetails(id: number){
    this.router.navigateByUrl('/details/'+id)
  }

  subscribeToSensors(roomId: string, topic: string){
    this.subscription = this.eventMqtt.subscribeTopic(roomId, topic)
      .subscribe((data: IMqttMessage) => {
        let item = JSON.parse(data.payload.toString())
        this.setSensorData(item)
      })
  }

  getRoomSensors(){
    this.allRooms.forEach((room)=>{
      let id = room.id_habitacion.id_habitacion
      this.sensorsList.forEach((sensor)=>{
        this.subscribeToSensors(id, sensor.topico)
      })
    })
  }

  setSensorData(data: any){
    setInterval(()=>{
      let key = `${data.id_habitacion+data.id_sensor}`
      this.mapSensors.set(key, data.valor)
      console.log(this.mapSensors.get(key));
      
    }, 2000)
  }
}
