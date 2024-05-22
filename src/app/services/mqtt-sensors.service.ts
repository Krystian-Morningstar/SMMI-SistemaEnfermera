import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService, MqttConnectionState, IMqttServiceOptions } from 'ngx-mqtt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttSensorsService {

  baseUrl = ''

  constructor(private _mqttService: MqttService) {
    this.baseUrl = 'SMMI'
  }

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
    let topicUrl = `${this.baseUrl}`+'/Habitacion'+`${roomId}`+`${topic}`
    console.log(topicUrl)
    return this._mqttService.observe(topicUrl)
  }
}
