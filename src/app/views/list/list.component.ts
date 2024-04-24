import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { pacients } from '../../modules/examples/pacient.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  list: any = []
  
  constructor(private router: Router) {
    this.list = pacients
  }

  showDetails(index: number){
    this.router.navigateByUrl('/details/'+index)
  }
}
