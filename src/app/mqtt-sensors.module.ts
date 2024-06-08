import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environment/environment';

import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.url_mqtt,
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
