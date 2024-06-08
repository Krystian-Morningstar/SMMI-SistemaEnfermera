import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getNurseInfo(tuition: string): Observable<any>{
    return this.http.get(`${environment.url_api}/api/enfermeras/${tuition}`)
  }
}
