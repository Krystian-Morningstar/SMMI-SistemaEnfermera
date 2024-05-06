import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NgFor } from '@angular/common';

import { PacientsService } from '../../services/pacients.service';
import { JwttokenService } from '../../services/jwttoken.service';
import { JwtPayload } from 'jwt-decode';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  allRooms: any = []

  blankspace: boolean = false
  loading: boolean = true
  
  constructor(private router: Router, private rooms: PacientsService, jwtService: JwttokenService) {
    const jwt = jwtService.getToken()
    if(jwt == null){
      alert("El token guardado ya ha expirado")
    }
    else{
      const jwtDecoded = jwtService.getDecodeToken(jwt!)
      const jwtObject = this.returnJSObject(jwtDecoded)
      const tuition = jwtObject.matricula

      this.getMyRooms(rooms, tuition)

    }
  }

  returnJSObject(jwt: JwtPayload){
    let json = JSON.stringify(jwt)
    let object = JSON.parse(json)
    return object
  }

  getAllRooms(roomService: PacientsService, tuition: string){
    return new Promise((resolve, reject) => {
      roomService.getRooms(tuition).subscribe(result => {
        console.log(result);
        let allRooms: any[] = result
        if(allRooms.length==0){
          reject(new Error("No existen pacientes encargados a la enfermera actual"))
        }
        setTimeout(()=>{
          resolve(allRooms)
        }, 6000)
      })
    })
  }

  async getMyRooms(rooms: PacientsService, tuition: string){
    this.allRooms = await this.getAllRooms(rooms, tuition)
    this.blankspace = (this.allRooms.length == 0)
    console.log(this.blankspace);
    this.loading = false
  }


  showDetails(index: number){
    this.router.navigateByUrl('/details/'+index)
  }
}
