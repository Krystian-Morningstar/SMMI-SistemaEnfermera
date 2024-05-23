import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

import { JwttokenService } from '../../services/jwttoken.service';
import { BasicVariablesService } from '../../services/basic-variables.service';
import { PacientsService } from '../../services/pacients.service';

import { detalles } from 'src/app/models/pacientDetails.model';
import { MqttSensorsService } from 'src/app/services/mqtt-sensors.service';
import { StadisticsService } from 'src/app/services/stadistics.service';
import { Subscription } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-pacient-details',
  templateUrl: './pacient-details.component.html',
  styleUrls: ['./pacient-details.component.css']
})
export class PacientDetailsComponent implements OnInit, OnDestroy{
  @ViewChild("oxig") oxigChart!: ChartComponent;
  @ViewChild("freqCard") freqCardChart!: ChartComponent;
  @ViewChild("presArtsist") presArtsistChart!: ChartComponent 
  @ViewChild("tempCorp") tempCorpChart!: ChartComponent

  public oxigOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: "My-series",
        data: [0, 0, 0, 0, 0]
      }
    ],
    chart: {
      height: 130,
      type: "line"
    },
    xaxis: {
      categories: ["1", "2", "3", "4", "5"]
    }
  }

  public freqCardOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: "My-series",
        data: [0, 0, 0, 0, 0]
      }
    ],
    chart: {
      height: 130,
      type: "line"
    },
    xaxis: {
      categories: ["1", "2", "3", "4", "5"]
    }
  }

  public presArtOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: "My-series",
        data: [0, 0, 0, 0, 0]
      },
      {
        name: "My-series2",
        data: [0, 0, 0, 0, 0]
      }
    ],
    chart: {
      height: 130,
      type: "line"
    },
    xaxis: {
      categories: ["1", "2", "3", "4", "5"]
    }
  }

  public tempCorpOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: "My-series",
        data: [0, 0, 0, 0, 0]
      }
    ],
    chart: {
      height: 130,
      type: "line"
    },
    xaxis: {
      categories: ["1", "2", "3", "4", "5"]
    }
  }

  subscriptions: Subscription[] = []

  pacientDetails: detalles = {
    id_ingreso: '',
    nombres: '',
    apellidos: '',
    sexo: '',
    edad: 0,
    padecimientos: '',
    alergias: '',
    causa_ingreso: '',
    id_habitacion: 0,
    nombre_habitacion: '',
    especialidad:''
  }
  
  loading: boolean = true

  constructor(
    private readonly mqttService: MqttSensorsService,
    private route: ActivatedRoute, 
    private ruta: Router, 
    private jwtService: JwttokenService, 
    private basic: BasicVariablesService, 
    private pacientsService: PacientsService,
    private stadisticsService: StadisticsService)
    {}

  ngOnInit(): void {
    const jwt = this.jwtService.getToken()
    if(jwt == null){
      alert("El token guardado ya ha expirado")
      this.basic.logout
    }
    else{
      this.mqttService.connect()
      let id = this.route.snapshot.params['id']
      this.setDetails(this.pacientsService, id)
    }
    console.log(this.oxigOptions);
    
  }

  ngOnDestroy(): void{
    this.mqttService.disconnect()
  }

  getDetails(pacientService: PacientsService, id: string){
    return new Promise((resolve, reject)=> {
      pacientService.getPacientDetails(id).subscribe(result => {
        let details: any = result
        setTimeout(()=> {
          resolve(details)
        }, 1500)
      })
    })
  }

  async setDetails(service: PacientsService, id: string){
    this.getDetails(service, id)
      .then((result: any) => {
        this.pacientDetails = {
          id_ingreso: result.id_ingreso,
          nombres: result.nombres,
          apellidos: result.apellidos,
          sexo: result.sexo,
          edad: result.edad,
          padecimientos: result.padecimientos,
          alergias: result.alergias,
          causa_ingreso: result.causa_ingreso,
          id_habitacion: result.id_habitacion.id_habitacion,
          nombre_habitacion: result.id_habitacion.id_habitacion,
          especialidad: result.id_especialidad.nombre
        }
        this.loading = false
        this.getStadistics(this.pacientDetails.id_habitacion)
      })
      .catch(err => {
        alert("ha ocurrido un problema: "+err.message)
      })
  }

  getStadistics(id: number){
    let oxigSubscription = this.stadisticsService.getStadistics(id, "/oxig").subscribe(response => {
      console.log(response)
      this.oxigOptions.series[0] = response.series
      this.oxigOptions.xaxis.categories = response.categories
    })
    this.subscriptions.push(oxigSubscription)
    let freqCardSubscription = this.stadisticsService.getStadistics(id, "/freqCard").subscribe(response => {
      this.freqCardOptions.series[0] = response.series
      this.freqCardOptions.xaxis.categories = response.categories
    })
    this.subscriptions.push(freqCardSubscription)
    let presArtsistSubscription = this.stadisticsService.getStadistics(id, "/presArtsist").subscribe(response => {
      this.presArtOptions.series[0] = response.series[0]
      this.presArtOptions.xaxis.categories = response.categories
    })
    this.subscriptions.push(presArtsistSubscription)
    let presArtdiastSubscription = this.stadisticsService.getStadistics(id, "/presArtdiast").subscribe(response => {
      this.presArtOptions.series[1] = response.series[0]
    })
    this.subscriptions.push(presArtdiastSubscription)
    this.subscriptions.push(presArtsistSubscription)
    let tempCorpSubscription = this.stadisticsService.getStadistics(id, "/tempCorp").subscribe(response => {
      this.tempCorpOptions.series[0] = response.series
      this.tempCorpOptions.xaxis.categories = response.categories
    })
    this.subscriptions.push(tempCorpSubscription)
  }

  showPrescriptions(){
    this.ruta.navigateByUrl('/prescriptions/'+this.pacientDetails.id_ingreso)
  }

  showReports(){
    this.ruta.navigateByUrl('/reports/'+this.pacientDetails.id_ingreso)
  }
}
