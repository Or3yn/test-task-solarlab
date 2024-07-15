import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadataService {
  private apiUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  private apiKey = 'YOUR_DADATA_API_KEY';

  constructor(private http: HttpClient) {}

  getCitySuggestions(query: string): Observable<any> {
    const headers = { 'Authorization': `Token ${this.apiKey}` };
    const params = { query, count: '10' };
    return this.http.get(this.apiUrl, { headers, params });
  }
}
