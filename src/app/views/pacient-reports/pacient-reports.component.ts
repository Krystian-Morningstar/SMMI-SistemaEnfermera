import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { reports } from '../../models/examples/report.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pacient-reports',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pacient-reports.component.html',
  styleUrl: './pacient-reports.component.css'
})
export class PacientReportsComponent {

  id: number = 0;
  reportList: any[] = []

  constructor(private route: ActivatedRoute){
    this.id = route.snapshot.params['id'];
    reports.forEach(async (report)=> {
      if(report.pacient_id == this.id){
        this.reportList.push(report);
      }
    })
  }
}
