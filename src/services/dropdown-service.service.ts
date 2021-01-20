import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class DropdownService {

  private url = 'http://localhost:8083/dropdownservice';

  constructor(private http: HttpClient) {
  }

  getCategoryDropdown(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  getDropdownValuesByCategory(category:string): Observable<any> {
    return this.http.get(`${this.url}`+"/category/"+category);
  }
}