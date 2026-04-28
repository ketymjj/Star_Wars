import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Film, Person, Planet, Species, SwapiResponse, Starship, Vehicle } from '../models/swapi.models';

@Injectable({ providedIn: 'root' })
export class SwapiService {

  // 👉 já considerando /api
  private api = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  // 🔥 método genérico (evita repetição)
  private getResource<T>(endpoint: string, page?: number): Observable<SwapiResponse<T>> {
    const url = page
      ? `${this.api}/${endpoint}?page=${page}`
      : `${this.api}/${endpoint}`;

    return this.http.get<SwapiResponse<T>>(url);
  }

  // ✅ endpoints

  getPeople(page = 1): Observable<SwapiResponse<Person>> {
    return this.getResource<Person>('people', page);
  }

  // ⚠️ films NÃO usa paginação
  getFilms(): Observable<SwapiResponse<Film>> {
    return this.getResource<Film>('films');
  }

  getPlanets(page = 1): Observable<SwapiResponse<Planet>> {
    return this.getResource<Planet>('planets', page);
  }

  getStarships(page = 1): Observable<SwapiResponse<Starship>> {
    return this.getResource<Starship>('starships', page);
  }

  getVehicles(page = 1): Observable<SwapiResponse<Vehicle>> {
    return this.getResource<Vehicle>('vehicles', page);
  }

  getSpecies(page = 1): Observable<SwapiResponse<Species>> {
    return this.getResource<Species>('species', page);
  }
}
