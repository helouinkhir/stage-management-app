import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  url = 'companies';

  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  constructor(private http: HttpClient) { }

  fetchCompanies(): Observable<ICompany[]> {
    return this.http.get(environment.apiUrl + this.url, { headers: this.headers }).pipe(
      map((response: any) => {
        if (!(response && response.success)) { throw { apiMsg: response.message }; }

        return response.data.map((d: any) => ({
          // eslint-disable-next-line no-underscore-dangle
          id: d._id,
          name: d.name,
          companyId: d.companyId,
          stage: d.stage,
        }));
      }),
    );
  }

  addCompany(stage: string, name: string, companyId: string): Observable<ICompany> {
    return this.http.post(`${environment.apiUrl + this.url}/add`, { stage, name, companyId }, { headers: this.headers }).pipe(
      map((response: any) => {
        if (!(response && response.success)) { throw { apiMsg: response.message }; }

        return {
          id: response.data._id,
          name: response.data.name,
          companyId: response.data.companyId,
          stage: response.data.stage,
        };
      }),
    );
  }

  editCompany(id: string, name: string): Observable<void> {
    return this.http.post(`${environment.apiUrl + this.url}/update-name`, { id, name }, { headers: this.headers }).pipe(
      map((response: any) => {
        if (!(response && response.success)) { throw { apiMsg: response.message }; }
      }),
    );
  }
}
