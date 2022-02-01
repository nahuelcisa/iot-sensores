import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../interfaces/respuesta.interface';

@Injectable({
  providedIn: 'root',
})
export class MaquinaService {
  private urlTraerMaquinas: string = environment.apiUrl + 'listadoMaquinas';
  private urlTraerCantidadMaquinas: string =
    environment.apiUrl + 'cantidadMaquinas';
    private urlAlta: string =
    environment.apiUrl + 'maquina/alta';
  private urlTraerMaquinasAsignadas: string =
    environment.apiUrl + 'maquinasAsignadas';

  private urlAsignarUsuarioMaquina: string =
    environment.apiUrl + 'usuario/asignar';

  private urlAltaLogica: string =
    environment.apiUrl + 'maquina/altaLogica';

  private urlBajaLogica: string =
    environment.apiUrl + 'maquina/bajaLogica';

  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
  });

  traerMaquinas() {
    return this.http.post<Respuesta>(this.urlTraerMaquinas, {});
  }

  traerCantidadMaquinas(idUsuario: number) {
    return this.http.post<Respuesta>(
      this.urlTraerCantidadMaquinas,
      {
        idUsuario: idUsuario,
      },
      {
        headers: this.headers,
      }
    );
  }

  asignarUsuarioMaquina(idUsuario: number, idMaquina: number) {
    return this.http.post<Respuesta>(
      this.urlAsignarUsuarioMaquina,
      {
        idUsuario: idUsuario,
        idMaquina: idMaquina,
      },
      { headers: this.headers }
    );
  }
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

  altaMaquina(maquina: any) {
    return this.http.post<Respuesta>(this.urlAlta, maquina, {
      headers: this.headers,
    });
  }

  habilitarMaquina(idMaquina : string){
    return this.http.post<Respuesta>(this.urlAltaLogica,
      {idMaquina : parseInt(idMaquina) },
      {headers : this.headers}
    );
  }
  deshabilitarMaquina(idMaquina : string){
    return this.http.post<Respuesta>(this.urlBajaLogica,
      {idMaquina : parseInt(idMaquina)},
      {headers : this.headers}
    );
  }
}
