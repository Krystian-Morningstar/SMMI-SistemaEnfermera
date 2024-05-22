import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JwtPayload } from 'jwt-decode';
import { Observable, Subscription, of } from 'rxjs';
import { IMqttMessage } from 'ngx-mqtt';

import { MqttSensorsService } from 'src/app/services/mqtt-sensors.service';
import { PacientsService } from '../../services/pacients.service';
import { JwttokenService } from '../../services/jwttoken.service';
import { BasicVariablesService } from '../../services/basic-variables.service';
import { informacion } from 'src/app/models/pacientCard.model';
import { subscripcionPack } from 'src/app/models/sensorSub.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy{
  
  arregloPacientes: informacion[] = []
  arregloSensores: subscripcionPack[] = []

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
      this.eventMqtt.connect()
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

  ngOnDestroy(): void {
    this.arregloSensores.forEach(arreglo => {
      arreglo.sensores.forEach(sensor => {
        sensor.unsubscribe()
      })
    })
    this.eventMqtt.disconnect()
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
        oxig: 0,
        freqCard: 0,
        presArtsist: 0,
        presArtdiast: 0,
        tempCorp: 0
      }
      this.arregloPacientes.push(array)
    })
    this.setSubscribtions()
    this.loading = false
  }

  setSubscribtions(){
    let arregloMayor: subscripcionPack[] = []
    console.log(this.arregloPacientes)
      this.arregloPacientes.forEach(paciente => {
        let comprobante = this.arregloSensores.find(pak => pak.id_ingreso == paciente.id_ingreso)
        console.log(comprobante)
        if(comprobante == null){
          let arregloMenor: Subscription[] = []
          arregloMenor.push(this.eventMqtt.subscribeTopic(
            paciente.id_habitacion, "/oxig").subscribe((data: IMqttMessage) => {
              let item = JSON.parse(data.payload.toString())
              paciente.oxig = item.valor
            }
          ))
          arregloMenor.push(this.eventMqtt.subscribeTopic(
            paciente.id_habitacion, "/freqCard").subscribe((data: IMqttMessage) => {
              let item = JSON.parse(data.payload.toString())
              paciente.freqCard = item.valor
            }
          ))
          arregloMenor.push(this.eventMqtt.subscribeTopic(
            paciente.id_habitacion, "/presArtsist").subscribe((data: IMqttMessage) => {
              let item = JSON.parse(data.payload.toString())
              paciente.presArtsist = item.valor
            }
          ))
          arregloMenor.push(this.eventMqtt.subscribeTopic(
            paciente.id_habitacion, "/presArtdiast").subscribe((data: IMqttMessage) => {
              let item = JSON.parse(data.payload.toString())
              paciente.presArtdiast = item.valor
            }
          ))
          arregloMenor.push(this.eventMqtt.subscribeTopic(
            paciente.id_habitacion, "/tempCorp").subscribe((data: IMqttMessage) => {
              let item = JSON.parse(data.payload.toString())
              paciente.tempCorp = item.valor
            }
          ))
          arregloMayor.push({
            id_ingreso: paciente.id_ingreso,
            sensores: arregloMenor
          })
        }
        else{
          console.log("el cuarto ya existe");
        }
        this.arregloSensores = arregloMayor
      })
  }

  showDetails(id: string){
    this.router.navigateByUrl('/details/'+id)
  }
}
