import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Respuesta } from '../interfaces/respuesta.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaquinasService {
  private urlTraerMaquinasAsignadas: string =
    environment.apiUrl + 'maquinasAsignadas';

  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
  });

  traerMaquinasAsignadas(idUsuario: number) {
    return this.http.post<Respuesta>(
      this.urlTraerMaquinasAsignadas,
      {
        idUsuario: idUsuario,
      },
      {
        headers: this.headers,
      }
    );
  }
}
