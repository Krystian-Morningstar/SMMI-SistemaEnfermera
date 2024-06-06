import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientsService {

  baseUrl: string = ''

  constructor(private http: HttpClient) {
    this.baseUrl = "http://192.168.137.137:3000/api/ingresos/"
  }

  getAllPacients(nurse: string): Observable<any>{
    return this.http.get(`${this.baseUrl + "enfermera/" + nurse}`)
  }

  getPacientDetails(pacient: string): Observable<any>{
    return this.http.get(`${this.baseUrl + pacient}`)
  }
}
