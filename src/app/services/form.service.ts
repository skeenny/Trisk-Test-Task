import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequestData, IFormData } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getIFormData(): Observable<IFormData> {
    return this.http.get<IFormData>(this.baseUrl + 'data');
  }

  updateIFormData(IFormData: IFormData): Observable<IFormData> {
    return this.http.put<IFormData>(this.baseUrl + 'data', IFormData);
  }
}
