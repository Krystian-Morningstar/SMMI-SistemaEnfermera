import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StadisticsService {

  baseUrl = ''

  constructor(private http: HttpClient) {
    this.baseUrl = "http://192.168.137.137:3000/api/sensores/estadi"
  }

  getStadistics(idRoom: number, topic: string): Observable<any>{
    const date = new Date();
    const hours = date.getHours()
    const formattedDate = date.toISOString().split('T')[0].replace(/-/g, ' ')
    const urlParameters = `${this.baseUrl}?habitacion=${idRoom}&topico=${topic}&fechainit=${formattedDate}&hinit=${hours}`
    return this.http.get(urlParameters)
  }
}
