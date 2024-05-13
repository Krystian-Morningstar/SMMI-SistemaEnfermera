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
    this.connect("127.0.0.1", 8083)
  }

  connect(host: string, port:number): Observable<MqttConnectionState>{
    const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
      hostname: host,
      port: port,
      protocol: "ws",
      path: '/mqtt'
    }
    try{
      this._mqttService.connect(MQTT_SERVICE_OPTIONS)
    }
    catch(err){
      console.log('mqtt.connect error', err);
    }

    console.log(this._mqttService.state)
    return this._mqttService.state
  }

  subscribeTopic(roomId: string, topic: string): Observable<IMqttMessage>{
    let topicUrl = `${this.baseUrl}`+'/Habitacion'+`${roomId}`+`${topic}`
    console.log(topicUrl)
    return this._mqttService.observe(topicUrl)
  }
}
