import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {

  baseUrl = ''

  constructor(private http: HttpClient) {
    this.baseUrl  = `${environment.url_api}/api/recetas/`
  }

  getPrescriptions(id: string): Observable<any>{
    return this.http.get(`${this.baseUrl}`+`${id}`)
  }
}
