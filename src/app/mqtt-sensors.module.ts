import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '127.0.0.1',
  port: 8083,
  protocol: "ws",
  path: '/mqtt',
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  exports:[
    MqttModule
  ]
})
export class MqttSensorsModule { }
