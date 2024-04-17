import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { prescriptions } from '../../modules/prescription.model';

@Component({
  selector: 'app-pacient-prescriptions',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pacient-prescriptions.component.html',
  styleUrl: './pacient-prescriptions.component.css'
})
export class PacientPrescriptionsComponent {

  id: number = 0;
  prescriptionList: any[] = [];

  constructor(private route: ActivatedRoute){
    this.id = route.snapshot.params['id'];
    prescriptions.forEach(async (prescription)=> {
      if(prescription.pacient_id == this.id){
        this.prescriptionList.push(prescription);
      }
    })
  }

}
