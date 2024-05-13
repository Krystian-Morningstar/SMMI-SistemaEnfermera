import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { MqttSensorsModule } from './mqtt-sensors.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { ListComponent } from './views/list/list.component';
import { HeaderComponent } from './views/header/header.component';
import { UserTabComponent } from './views/user-tab/user-tab.component';
import { PacientDetailsComponent } from './views/pacient-details/pacient-details.component';
import { PacientPrescriptionsComponent } from './views/pacient-prescriptions/pacient-prescriptions.component';
import { PacientReportsComponent } from './views/pacient-reports/pacient-reports.component';
import { DangerAlertComponent } from './views/danger-alert/danger-alert.component';
import { ReportingComponent } from './views/reporting/reporting.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    HeaderComponent,
    UserTabComponent,
    PacientDetailsComponent,
    PacientPrescriptionsComponent,
    PacientReportsComponent,
    DangerAlertComponent,
    ReportingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MqttSensorsModule,
    RouterOutlet,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
