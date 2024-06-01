import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actualizar } from 'src/app/models/updateReport.model';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent {

  reporteId = ''
  ingresoId = ''
  datos: actualizar = {
    evento_critico: '',
    acciones_tomadas: ''
  }

  constructor(route: ActivatedRoute, private ruta: Router, private reports: ReportsService){
    this.reporteId = route.snapshot.params['id']
    this.ingresoId = localStorage.getItem('registerId')!
  }

  updating(){
    this.reports.updateReport(this.reporteId, this.datos)
      .then((response) => {
        console.log(response)
        alert("Reporte actualizado")
        this.ruta.navigateByUrl('/reports/'+this.ingresoId)
      })
      .catch((err) => console.log(err))
  }

  // updating(){
  //   this.reports.updateReport(this.reporteId, this.datos).subscribe((response) => {
  //     console.log("respuesta del servidor", response);
  //   }, error => {
  //     console.error("error", error);
      
  //   })
  // }
}
