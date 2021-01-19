import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private url = 'http://localhost:9000/api/dropdownservice';

  constructor(private http: HttpClient) {
  }

  getCategoryDropdown(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  getDropdownValuesByCategory(category:string): Observable<any> {
    return this.http.get(`${this.url}`+"/category/"+category);
  }
}