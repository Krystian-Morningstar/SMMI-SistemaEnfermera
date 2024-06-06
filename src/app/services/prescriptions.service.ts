import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {

  baseUrl = ''

  constructor(private http: HttpClient) {
    this.baseUrl  = 'http://192.168.137.137:3000/api/recetas/'
  }

  getPrescriptions(id: string): Observable<any>{
    return this.http.get(`${this.baseUrl}`+`${id}`)
  }
}
