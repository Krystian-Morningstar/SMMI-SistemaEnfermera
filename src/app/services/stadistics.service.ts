import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StadisticsService {

  baseUrl = ''

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:3000/api/sensores/estadi"
  }

  getStadistics(idRoom: number, topic: string): Observable<any>{
    const urlParameters = `${this.baseUrl}?habitacion=${idRoom}&topico=${topic}`
    return this.http.get(urlParameters)
  }
}
