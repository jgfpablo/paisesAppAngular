import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paises } from '../interfaces/paises.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  get httpParams() {
    return new HttpParams().set('fields', 'name,population,capital,cca2,flags');
  }

  constructor(private httpClient: HttpClient) {}

  buscarPais(termino: string): Observable<Paises[]> {
    return this.httpClient.get<Paises[]>(`${this.apiUrl}/name/${termino}`, {
      params: this.httpParams,
    });
  }

  buscarCapital(termino: string): Observable<Paises[]> {
    return this.httpClient.get<Paises[]>(`${this.apiUrl}/capital/${termino}`, {
      params: this.httpParams,
    });
  }

  buscarRegion(termino: string): Observable<Paises[]> {
    return this.httpClient.get<Paises[]>(`${this.apiUrl}/region/${termino}`, {
      params: this.httpParams,
    });
  }

  // verPaisPorNombre(id: string): Observable<Paises> {
  //   return this.httpClient.get<Paises>(`${this.apiUrl}/alpha/${id}`, {
  //     params: this.httpParams,
  //   });
  // }
}
