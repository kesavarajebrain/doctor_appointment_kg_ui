import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private BaseUrl = "http://localhost:5000/api/";
  constructor(private http: HttpClient) { }

  registerEmployee(data) {
    return this.http.post<any>(this.BaseUrl + 'registerEmployee', data);
  }
}
