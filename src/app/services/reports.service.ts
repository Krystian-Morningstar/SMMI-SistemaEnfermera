import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { actualizar } from '../models/updateReport.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  baseUrl = ''

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_api}/api/alertas-reportes/`
  }

  getReports(pacientId: string): Observable<any>{
    return this.http.get(`${this.baseUrl}${pacientId}`)
  }

  getCompletes(pacientId: string): Observable<any>{
    return this.http.get(`${this.baseUrl}comp/${pacientId}`)
  }

  getIncompletes(pacientId: string): Observable<any>{
    return this.http.get(`${this.baseUrl}incomp/${pacientId}`)
  }

  updateReport(reporteId: string, info: actualizar): Promise<any>{
    return new Promise((resolve, reject) => {
      console.log(JSON.stringify(info), reporteId);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
      console.log(`${this.baseUrl}${reporteId}`);

      this.http.patch(`${this.baseUrl}${reporteId}`, info, {headers: headers}).subscribe(()=>{
        console.log("hola");
      })
      setTimeout(()=>{
        resolve("actualizado")
      }, 1000)
    })
  }
  
  // updateReport(reporteId: string, info: actualizar): Observable<any>{
  //   console.log(JSON.stringify(info), reporteId);
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
  //   console.log(`${this.baseUrl}${reporteId}`);

      
  //   return this.http.patch<any>(`${this.baseUrl}${reporteId}`, obj, {headers: headers})
  // }
}
