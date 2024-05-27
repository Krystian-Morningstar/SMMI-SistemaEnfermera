import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService, MqttConnectionState, IMqttServiceOptions } from 'ngx-mqtt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttSensorsService {

  constructor(private _mqttService: MqttService) {}

  connect(): Observable<MqttConnectionState>{
    const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
      hostname: "127.0.0.1",
      port: 8083,
      protocol: "ws",
      path: '/mqtt'
    }
    try{
      this._mqttService.connect(MQTT_SERVICE_OPTIONS)
      console.log("conectado a emulador");
      
    }
    catch(err){
      console.log('mqtt.connect error', err);
    }

    console.log(this._mqttService.state)
    return this._mqttService.state
  }

  disconnect(){
    this._mqttService.disconnect()
    console.log("desconectado a emulador");
    
  }

  subscribeTopic(roomId: number, topic: string): Observable<IMqttMessage>{
    let topicUrl = `SMMI/Habitacion${roomId}${topic}`
    console.log(topicUrl)
    return this._mqttService.observe(topicUrl)
  }

  subscribeToAlarm(idRoom: number): Observable<IMqttMessage>{
    let alarmUrl = `SMMI/Habitacion${idRoom}/emergencia`
    return this._mqttService.observe(alarmUrl)
  }

  turnOffSirenHorn(roomId: number){
    return new Promise((resolve, reject) => {
      let sirenUrl = `SMMI/Habitacion${roomId}/sirena`
      let hornUrl = `SMMI/Habitacion${roomId}/bocina`
      let value = {
        value: 1
      }
      this._mqttService.publish(sirenUrl, JSON.stringify(value)).subscribe(() => {
        console.log("desactivando Sirena");
      })
      this._mqttService.publish(hornUrl, JSON.stringify(value)).subscribe(() => {
        console.log("desactivando bocina");
      })
      setTimeout(()=>{
        resolve("alarma apagada")
      }, 1000)
    })
  }
}
