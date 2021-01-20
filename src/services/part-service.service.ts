import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PartService {

  private url = 'http://localhost:8083/parthistoryservice';

  constructor(private http: HttpClient) {
  }

  getParts(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  getPartHistory(id: number): Observable<any> {
    return this.http.get(`${this.url}` + "/history/" + id);
  }

  getPartHistoryByDates(id: number, fromDate: string, toDate: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('fromDate', fromDate);
    params = params.append('toDate', toDate);
    return this.http.get(`${this.url}` + "/historywithdates/" + id, { params: params });
  }

  
  addPart(part: Object): Observable<Object> {
    return this.http.post(`${this.url}`, part);
  }

  deletePart(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}