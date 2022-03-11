import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, catchError, tap } from 'rxjs';
import { Persona, PersonaLista } from './persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private personaUrl = 'http://localhost:8080/persona/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPersonas(): Observable<PersonaLista> {
    return this.http.get<PersonaLista>(this.personaUrl)
      .pipe(
        catchError(this.handleError<PersonaLista>('getPersonas', undefined))
      );
  }

  getPersona(id :string): Observable<Persona> {
    return this.http.get<Persona>(this.personaUrl+id)
      .pipe(
        catchError(this.handleError<Persona>('getPersona', undefined))
      );
  }

  addPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.personaUrl, persona, this.httpOptions)
      .pipe(
        catchError(this.handleError<Persona>('addPersona', undefined))
      );
  }

  updatePersona(id :string, persona: Persona): Observable<any> {
    return this.http.put(this.personaUrl+id, persona, this.httpOptions)
      .pipe(
        catchError(this.handleError<Persona>('updatePersona', undefined))
      );
  }

  deletePersona(id: string): Observable<Persona> {
    return this.http.delete<Persona>(this.personaUrl+id, this.httpOptions)
      .pipe(
        catchError(this.handleError<Persona>('deletePersona', undefined))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
