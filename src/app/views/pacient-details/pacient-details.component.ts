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
import { IMqttMessage } from 'ngx-mqtt';

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
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: "My-series",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ],
    chart: {
      height: 350,
      type: "bar"
    },
    title: {
      text: "My First Angular Chart"
    },
    xaxis: {
      categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
    }
  }
  
  currentTime = new Date()
  oneBTime = new Date(this.currentTime.getSeconds() - 1)
  twoBTime = new Date(this.currentTime.getSeconds() - 2)
  threeBTime = new Date(this.currentTime.getSeconds() - 3)
  fourBTime = new Date(this.currentTime.getSeconds() - 4)

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

  oxigenData: number[] = []
  freqCardData: number[] = []
  presArtData: number[] = []
  tempCorpData: number[] = []
  
  loading: boolean = true

  constructor(
    private readonly mqttService: MqttSensorsService,
    private route: ActivatedRoute, 
    private ruta: Router, 
    private jwtService: JwttokenService, 
    private basic: BasicVariablesService, 
    private pacientsService: PacientsService)
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
      this.initializeCharts()
    }
    console.log(this.chartOptions);
    
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
        }, 2000)
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
        let idRoom = `${this.pacientDetails.id_habitacion}`
        this.setCharts(idRoom)
      })
      .catch(err => {
        alert("ha ocurrido un problema: "+err.message)
      })
  }

  setCharts(id: string){
    // this.mqttService.subscribeTopic(id, "/oxig")
    //   .subscribe((data: IMqttMessage)=>{
    //     let item = JSON.parse(data.payload.toString())
    //     this.oxigenChart.data.labels?.push(new Date().getSeconds)
    //     this.oxigenChart.data.datasets[0].data.push(item.valor)
    // })
    // this.mqttService.subscribeTopic(id, "/freqCard")
    //   .subscribe((data: IMqttMessage)=>{
    //     let item = JSON.parse(data.payload.toString())
    //     this.freqCardChart.data.labels?.push(new Date().getSeconds)
    //     this.freqCardChart.data.datasets[0].data.push(item.valor)
    // })
    // this.mqttService.subscribeTopic(id, "/presArtsist")
    //   .subscribe((data: IMqttMessage)=>{
    //     let item = JSON.parse(data.payload.toString())
    //     this.presArtChart.data.labels?.push(new Date().getSeconds)
    //     this.presArtChart.data.datasets[0].data.push(item.valor)
    // })
    // this.mqttService.subscribeTopic(id, "/presArtdiast")
    //   .subscribe((data: IMqttMessage)=>{
    //     let item = JSON.parse(data.payload.toString())
    //     this.presArtChart.data.datasets[1].data.push(item.valor)
    // })
    // this.mqttService.subscribeTopic(id, "/tempCorp")
    //   .subscribe((data: IMqttMessage)=>{
    //     let item = JSON.parse(data.payload.toString())
    //     this.tempCorpChart.data.labels?.push(new Date().getSeconds)
    //     this.tempCorpChart.data.datasets[0].data.push(item.valor)
    // })
  }

  initializeCharts(){
    
    
    // this.oxigenChart = new Chart("oxigen",{
    //   type: 'line',
    //   data: {
    //     labels: [
    //       this.fourBTime,
    //       this.threeBTime,
    //       this.twoBTime,
    //       this.oneBTime, 
    //       this.currentTime.getSeconds
    //     ], 
    //     datasets: [
    //       {
    //         label: "rpm",
    //         data: [0, 0, 0, 0, 0],
    //         backgroundColor: '#0023FF'
    //       }
    //     ]
    //   },
    //   options: {
    //     aspectRatio:2.5
    //   }
    // })
  
    // this.freqCardChart = new Chart("freqCard",{
    //   type: 'line',
    //   data: {
    //     labels: [
    //       this.fourBTime,
    //       this.threeBTime,
    //       this.twoBTime,
    //       this.oneBTime, 
    //       this.currentTime.getSeconds
    //     ], 
    //     datasets: [
    //       {
    //         label: "dbm",
    //         data: [0, 0, 0, 0, 0],
    //         backgroundColor: '#FF0000'
    //       }
    //     ]
    //   },
    //   options: {
    //     aspectRatio:2.5
    //   }
    // })
  
    // this.presArtChart = new Chart("presArt",{
    //   type: 'line',
    //   data: {
    //     labels: [
    //       this.fourBTime,
    //       this.threeBTime,
    //       this.twoBTime,
    //       this.oneBTime, 
    //       this.currentTime.getSeconds
    //     ], 
    //     datasets: [
    //       {
    //         label: "mmHg",
    //         data: [0, 0, 0, 0, 0],
    //         backgroundColor: '#13FF00'
    //       },
    //       {
    //         label: "mmHg",
    //         data: [0, 0, 0, 0, 0],
    //         backgroundColor: '#00FF64'
    //       }
    //     ]
    //   },
    //   options: {
    //     aspectRatio:2.5
    //   }
    // })
  
    // this.tempCorpChart = new Chart("tempCorp",{
    //   type: 'line',
    //   data: {
    //     labels: [
    //       this.fourBTime,
    //       this.threeBTime,
    //       this.twoBTime,
    //       this.oneBTime, 
    //       this.currentTime.getSeconds
    //     ], 
    //     datasets: [
    //       {
    //         label: "C°",
    //         data: [0, 0, 0, 0, 0],
    //         backgroundColor: '#4900FF'
    //       }
    //     ]
    //   },
    //   options: {
    //     aspectRatio:2.5
    //   }
    // })
  }


  showPrescriptions(){
    this.ruta.navigateByUrl('/prescriptions/'+this.pacientDetails.id_ingreso)
  }

  showReports(){
    this.ruta.navigateByUrl('/reports/'+this.pacientDetails.id_ingreso)
  }
}
