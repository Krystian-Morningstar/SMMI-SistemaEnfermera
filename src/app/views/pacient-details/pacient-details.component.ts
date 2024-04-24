import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pacients } from '../../modules/examples/pacient.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacient-details',
  standalone: true,
  imports: [],
  templateUrl: './pacient-details.component.html',
  styleUrl: './pacient-details.component.css'
})
export class PacientDetailsComponent {

  pacient: any
  id: number = 0;

  constructor(private route: ActivatedRoute, private ruta: Router){
    this.id = route.snapshot.params['id'];
    this.pacient = pacients[this.id];
  }

  showPrescriptions(){
    this.ruta.navigateByUrl('/prescriptions/'+this.pacient.id)
  }

  showReports(){
    this.ruta.navigateByUrl('/reports/'+this.pacient.id)
  }
}
