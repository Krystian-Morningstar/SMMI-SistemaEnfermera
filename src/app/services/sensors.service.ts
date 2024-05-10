import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  baseUrl = ''

  constructor(private http: HttpClient) {
    this.baseUrl = "https://smmi-api-production.up.railway.app/api/sensores/catalogo"
  }

  getSensors(): Observable<any>{
    return this.http.get(`${this.baseUrl}`)
  }
}
