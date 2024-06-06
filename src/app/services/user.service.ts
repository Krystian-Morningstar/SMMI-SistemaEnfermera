import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getNurseInfo(tuition: string): Observable<any>{
    return this.http.get(`http://192.168.137.137:3000/api/enfermeras/${tuition}`)
  }
}
