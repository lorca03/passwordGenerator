import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiWordsService {
  private readonly API_URL = 'https://clientes.api.greenborn.com.ar/public-random-word';

  constructor(private http: HttpClient) { }

  getRandomWord(length: number): Observable<any> {
    const url = `${this.API_URL}?l=${length}`;
    return this.http.get(url);
  }
}
