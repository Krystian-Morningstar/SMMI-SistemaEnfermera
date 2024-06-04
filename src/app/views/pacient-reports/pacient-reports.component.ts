import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { reporte } from 'src/app/models/report.model';

import { ReportsService } from 'src/app/services/reports.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pacient-reports',
  templateUrl: './pacient-reports.component.html',
  styleUrls: ['./pacient-reports.component.css']
})
export class PacientReportsComponent implements OnInit, OnDestroy{

  blankspace = false
  ingresoId= '';
  reportList: reporte[] = [];
  subscription: Subscription | undefined

  constructor(private reportsService: ReportsService, route: ActivatedRoute, private ruta: Router){
    this.ingresoId = route.snapshot.params['id'];
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe
  }
  ngOnInit(): void {
    this.subscription = this.reportsService.getReports(this.ingresoId).subscribe((response: any[])=> {
      if(response[0] == null){
        this.blankspace = true
      }
      else{
        let container: reporte[] = []
        response.forEach(details => {
          let dateString: string = details.fecha_registro
          let date = dateString.split("T")[0].split("-")
	        let time = dateString.split("T")[1].split(":")

		      let year = date[0]
		      let month = date[1]
		      let day = date[2]
		      let hour = time[0]
		      let minute = time[1]

          let hora = `${hour}:${minute} `
          let fecha = `${year}-${month}-${day}`

          let reporte: reporte = {
            id: details.id_reporte,
            hora: hora,
            fecha: fecha,
            duracion: details.duracion_emergencia_sg,
            evento: details.evento_critico,
            acciones: details.acciones_tomadas,
            completado: details.completado
          }
          container.push(reporte)
        })
        this.reportList = container
      }
    })
  }

  reporting(reportId: string){
    localStorage.setItem('registerId', this.ingresoId)
    this.ruta.navigateByUrl('/reporting/'+reportId)
  }
  
}
