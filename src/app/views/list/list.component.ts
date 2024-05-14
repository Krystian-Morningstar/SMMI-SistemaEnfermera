import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtPayload } from 'jwt-decode';
import { Observable, Subscription, of } from 'rxjs';
import { IMqttMessage } from 'ngx-mqtt';

import { MqttSensorsService } from 'src/app/services/mqtt-sensors.service';
import { PacientsService } from '../../services/pacients.service';
import { JwttokenService } from '../../services/jwttoken.service';
import { BasicVariablesService } from '../../services/basic-variables.service';
import { informacion } from 'src/app/models/pacientCard.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  
  miArreglo: informacion[] = []
  subscription: Subscription | undefined

  blankspace: boolean = false
  loading: boolean = true
  
  constructor(
    private readonly eventMqtt: MqttSensorsService,
    private router: Router, 
    private pacientsService: PacientsService,
    private jwtService: JwttokenService, 
    private basic: BasicVariablesService,
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

      this.getAllRooms(this.pacientsService, tuition)
        .then((response)=>{
          this.blankspace = false
          this.fixRooms(response)
        })
        .catch((err)=>{
          this.blankspace = true
          console.log("Error al leer los cuartos: ",err)
        })
    }
  }

  returnJSObject(jwt: JwtPayload){
    let json = JSON.stringify(jwt)
    let object = JSON.parse(json)
    return object
  }

  getAllRooms(roomService: PacientsService, tuition: string): Promise<any[]>{
    return new Promise((resolve, reject) => {
      roomService.getAllPacients(tuition).subscribe(result => {
        setTimeout(()=>{
          let allRooms: any[] = result
          if(allRooms.length==0){
            reject(new Error("No existen pacientes encargados a la enfermera actual"))
          }
          else{
            resolve(allRooms)
          }
        }, 3000)
      })
    })
  }

  fixRooms(rooms: any[]){
    rooms.forEach((room)=>{
      let array: informacion = {
        id_ingreso: room.id_ingreso,
        nombres: room.nombres,
        apellidos: room.apellidos,
        id_habitacion: room.id_habitacion.id_habitacion,
        nombre_habitacion: room.id_habitacion.nombre_habitacion,
        oxig: {
          nombre: 'Oxigenacion',
          topico: '/oxig',
          unidad_medida: 'rpm',
          valor: 0
        },
        freqCard: {
          nombre: 'Frecuencia Cardiaca',
          topico: '/freqCard',
          unidad_medida: 'bpm',
          valor: 0
        },
        presArtsist: {
          nombre: 'Presion Arterial Sistolica',
          topico: '/presArtsist',
          unidad_medida: 'mmHg',
          valor: 0
        },
        presArtdiast: {
          nombre: 'Presion Arterial Diastolica',
          topico: '/presArtdiast',
          unidad_medida: 'mmHg',
          valor: 0
        },
        tempCorp: {
          nombre: 'Temperatura Corporal',
          topico: '/tempCorp',
          unidad_medida: '°C',
          valor: 0
        }
      }
      this.miArreglo.push(array)
    })
    this.subscribeToSensors()
      .then((response)=>{
        console.log(response);
        this.loading = false
      })
  }

  showDetails(id: string){
    this.router.navigateByUrl('/details/'+id)
  }

  subscribeToSensors(){
    return new Promise((resolve, reject)=>{
      this.miArreglo.forEach(info=>{
        let id = `${info.id_habitacion}`
        this.subscription = this.eventMqtt.subscribeTopic(id, info.oxig.topico)
          .subscribe((data: IMqttMessage) => {
            let item = JSON.parse(data.payload.toString())
            info.oxig.valor = item.valor
        })
        this.subscription = this.eventMqtt.subscribeTopic(id, info.freqCard.topico)
          .subscribe((data: IMqttMessage) => {
            let item = JSON.parse(data.payload.toString())
            info.freqCard.valor = item.valor
        })
        this.subscription = this.eventMqtt.subscribeTopic(id, info.presArtsist.topico)
          .subscribe((data: IMqttMessage) => {
            let item = JSON.parse(data.payload.toString())
            info.presArtsist.valor = item.valor
        })
        this.subscription = this.eventMqtt.subscribeTopic(id, info.presArtdiast.topico)
          .subscribe((data: IMqttMessage) => {
            let item = JSON.parse(data.payload.toString())
            info.presArtdiast.valor = item.valor
        })
        this.subscription = this.eventMqtt.subscribeTopic(id, info.tempCorp.topico)
          .subscribe((data: IMqttMessage) => {
            let item = JSON.parse(data.payload.toString())
            info.tempCorp.valor = item.valor
        })
      })
      setTimeout(()=>{
        resolve(this.miArreglo)
      }, 2000)
    })
  }
}
