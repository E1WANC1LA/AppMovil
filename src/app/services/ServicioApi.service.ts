import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,forkJoin } from 'rxjs';
import { catchError ,map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioApi {

  apiUrl = 'https://www.presenteprofe.cl/api/v1/'; // Asegúrate de incluir 'https://'

  constructor(private http: HttpClient) { }

  login(correo: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { correo, password };
    return this.http.post<any>(this.apiUrl + 'auth', body, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  registrarUsuario(nombre: string, apellido: string, correo: string, perfil: string, run: string, codigo: string): Observable<any> {
    console.log('registrarUsuario:', codigo,run,nombre,apellido, correo, perfil);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { codigo,run,nombre,apellido, correo, perfil };
    return this.http.post<any>(this.apiUrl + 'usuarios', body, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  obtenerCursos(correo: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}cursos?user=${correo}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      // Backend error
      switch (error.status) {
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 500:
          errorMessage = 'Internal server error.';
          break;
        default:
          errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

