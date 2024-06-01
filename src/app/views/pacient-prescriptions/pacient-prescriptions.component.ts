import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { receta } from 'src/app/models/prescription.model';

import { PrescriptionsService } from 'src/app/services/prescriptions.service';

@Component({
  selector: 'app-pacient-prescriptions',
  templateUrl: './pacient-prescriptions.component.html',
  styleUrls: ['./pacient-prescriptions.component.css']
})
export class PacientPrescriptionsComponent implements OnInit, OnDestroy{

  blankspace = false
  id: string = '';
  prescriptionList: receta[] = [];
  subscription: Subscription | undefined 

  constructor(route: ActivatedRoute, private prescriptions: PrescriptionsService){
    this.id = route.snapshot.params['id'];
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe
  }

  ngOnInit(): void {
    this.subscription = this.prescriptions.getPrescriptions(this.id).subscribe((result: any[])=>{
      if(result[0] != null){
        let container: receta[] = []
        result.forEach(details => {
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
          let presc: receta = {
            medico: `${details.medico.nombre} ${details.medico.apellidos}`,
            medicina: details.medicamentos,
            instrucciones: details.indicaciones_addic,
            hora: hora,
            fecha: fecha
          }
          container.push(presc)
        })
        this.prescriptionList = container
      }
      else{
        this.blankspace = true
      }
    })
  }
}
