import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IStage } from 'src/app/shared/interfaces/stage.interface';
import { IResponse } from 'src/app/shared/interfaces/response.interface';
import { IResponseStage } from 'src/app/shared/interfaces/response-stage.interface';
import { IResponseListStage } from 'src/app/shared/interfaces/response-list-stage.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StageService {
  url = 'stages';

  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  constructor(private http: HttpClient) { }

  fetchStages(): Observable<IStage[]> {
    return this.http
      .get<IResponseListStage>(environment.apiUrl + this.url, { headers: this.headers })
      .pipe(
        map((response: IResponseListStage) => {
          if (!(response && response.success)) { throw { apiMsg: response.message }; }

          return response.data;
        }),
      );
  }

  addStage(name: string): Observable<IStage> {
    return this.http.post<IResponseStage>(`${environment.apiUrl + this.url}/add`, { name }, { headers: this.headers }).pipe(
      map((response: IResponseStage) => {
        if (!(response && response.success)) { throw { apiMsg: response.message }; }

        return response.data;
      }),
    );
  }

  editStage(id: string, name: string): Observable<void> {
    return this.http.post<IResponse>(`${environment.apiUrl + this.url}/update-name`, { id, name }, { headers: this.headers }).pipe(
      map((response: IResponse) => {
        if (!(response && response.success)) { throw { apiMsg: response.message }; }
      }),
    );
  }
}
