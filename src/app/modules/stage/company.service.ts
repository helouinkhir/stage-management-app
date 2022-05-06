import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { map } from 'rxjs/operators';
import { IResponseListCompany } from 'src/app/shared/interfaces/response-list-company.interface';
import { IResponseCompany } from 'src/app/shared/interfaces/response-company.interface';
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
    return this.http
      .get<IResponseListCompany >(environment.apiUrl + this.url, { headers: this.headers })
      .pipe(
        map((response: IResponseListCompany) => {
          if (!(response && response.success)) { throw { apiMsg: response.message }; }
          return response.data;
        }),
      );
  }

  addCompany(stage: string, name: string, companyId: string): Observable<ICompany> {
    return this.http.post<IResponseCompany>(`${environment.apiUrl + this.url}/add`, { stage, name, companyId }, { headers: this.headers }).pipe(
      map((response: IResponseCompany) => {
        if (!(response && response.success)) { throw { apiMsg: response.message }; }

        return response.data;
      }),
    );
  }

  editCompany(id: string, name: string): Observable<void> {
    return this.http.post<IResponseCompany>(`${environment.apiUrl + this.url}/update-name`, { id, name }, { headers: this.headers }).pipe(
      map((response: IResponseCompany) => {
        if (!(response && response.success)) { throw { apiMsg: response.message }; }
      }),
    );
  }
}
