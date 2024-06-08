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
import { alarma } from 'src/app/models/alarm.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy{
  
  arregloPacientes: informacion[] = []
  arregloSensores: subscripcionPack[] = []
  arregloAlarmas: alarma[] = []

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
          this.loading = false
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
    this.arregloAlarmas.forEach(alarma => alarma.alarma.unsubscribe())
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
        oxig: {
          alerta: false,
          valor: 0
        },
        freqCard: {
          alerta: false,
          valor: 0
        },
        presArtsist: {
          alerta: false,
          valor: 0
        },
        presArtdiast: {
          alerta: false,
          valor: 0
        },
        tempCorp: {
          alerta: false,
          valor: 0
        },
        alarm: false
      }
      this.arregloPacientes.push(array)
      this.setAlarmSubscription(room.id_habitacion.id_habitacion)
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
              paciente.oxig.valor = item.valor
            }
          ))
          arregloMenor.push(this.eventMqtt.subscribeTopic(
            paciente.id_habitacion, "/freqCard").subscribe((data: IMqttMessage) => {
              let item = JSON.parse(data.payload.toString())
              paciente.freqCard.valor = item.valor
            }
          ))
          arregloMenor.push(this.eventMqtt.subscribeTopic(
            paciente.id_habitacion, "/presArtsist").subscribe((data: IMqttMessage) => {
              let item = JSON.parse(data.payload.toString())
              paciente.presArtsist.valor = item.valor
            }
          ))
          arregloMenor.push(this.eventMqtt.subscribeTopic(
            paciente.id_habitacion, "/presArtdiast").subscribe((data: IMqttMessage) => {
              let item = JSON.parse(data.payload.toString())
              paciente.presArtdiast.valor = item.valor
            }
          ))
          arregloMenor.push(this.eventMqtt.subscribeTopic(
            paciente.id_habitacion, "/tempCorp").subscribe((data: IMqttMessage) => {
              let item = JSON.parse(data.payload.toString())
              paciente.tempCorp.valor = item.valor
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

  setAlarmSubscription(roomId: number){
      let id = roomId
      let alarma: alarma = {
        habitacion: id,
        alarma: this.eventMqtt.subscribeToAlarm(id).subscribe((data: IMqttMessage) => {
          let item = JSON.parse(data.payload.toString())
          console.log(item);
          switch(item.sensor){
            case 'Oxigenacion':
              this.arregloPacientes.find(pacient => pacient.id_habitacion == id)!.oxig.alerta = true
              break;
            case 'Frecuencia Cardiaca':
              this.arregloPacientes.find(pacient => pacient.id_habitacion == id)!.freqCard.alerta = true
              break;
            case 'Presion Arterial Sistolica':
              this.arregloPacientes.find(pacient => pacient.id_habitacion == id)!.presArtsist.alerta = true
              break;
            case 'Presion Arterial Diastolica':
              this.arregloPacientes.find(pacient => pacient.id_habitacion == id)!.presArtdiast.alerta = true
              break;
            case 'Temperatura Corporal':
              this.arregloPacientes.find(pacient => pacient.id_habitacion == id)!.tempCorp.alerta = true
              break;
          }
          this.arregloPacientes.find(pacient => pacient.id_habitacion == id)!.alarm = true
        })
      }
      this.arregloAlarmas.push(alarma)
      console.log(alarma);         
  }

  turnOffAlarm(roomId: number){
    this.eventMqtt.turnOffSirenHorn(roomId)
      .then(result => {
        this.arregloAlarmas.find(alarma => alarma.habitacion == roomId)?.alarma.unsubscribe()
        this.arregloPacientes.find(pacient => pacient.id_habitacion == roomId)!.alarm = false
        this.arregloPacientes.find(pacient => pacient.id_habitacion == roomId)!.oxig.alerta = false
        this.arregloPacientes.find(pacient => pacient.id_habitacion == roomId)!.freqCard.alerta = false
        this.arregloPacientes.find(pacient => pacient.id_habitacion == roomId)!.presArtdiast.alerta = false
        this.arregloPacientes.find(pacient => pacient.id_habitacion == roomId)!.presArtsist.alerta = false
        this.arregloPacientes.find(pacient => pacient.id_habitacion == roomId)!.tempCorp.alerta = false
        setTimeout(()=>{
          this.setAlarmSubscription(roomId)
        },10000)
        console.log(result);
      })
  }

  showDetails(id: string){
    this.router.navigateByUrl('/details/'+id)
  }
}
