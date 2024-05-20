import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { receta } from 'src/app/models/prescription.model';

import { PrescriptionsService } from 'src/app/services/prescriptions.service';

@Component({
  selector: 'app-pacient-prescriptions',
  templateUrl: './pacient-prescriptions.component.html',
  styleUrls: ['./pacient-prescriptions.component.css']
})
export class PacientPrescriptionsComponent implements OnInit{

  id: string = '';
  prescriptionList: receta[] = [];

  constructor(route: ActivatedRoute, private prescriptions: PrescriptionsService){
    this.id = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.prescriptions.getPrescriptions(this.id).subscribe((result: any[])=>{
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
    })
  }
}
