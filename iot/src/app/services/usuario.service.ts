import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario.interface';
import { Respuesta } from '../interfaces/respuesta.interface';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url: string = environment.apiUrl + 'login';
  private urlRegistro: string = environment.apiUrl + 'usuario/registro';
  private urlRstablecer: string = environment.apiUrl + 'restablecer';
  private urlCambiar: string = environment.apiUrl + 'cambiar';
  private urlListado: string = environment.apiUrl + 'listadoUsuarios';
  private urlAsignarMaquina: string = environment.apiUrl + 'usuario/asignar';
  private urlBajaLogica: string = environment.apiUrl + 'usuario/baja';
  private urlAltaLogica: string = environment.apiUrl + 'usuario/alta';
  private urlAsignarPerfil: string =
    environment.apiUrl + 'usuario/asignarPerfil';
  private urlTraerPerfiles: string = environment.apiUrl + 'listadoPerfiles';
  private urlPerfilesActuales: string =
    environment.apiUrl + 'perfilesActualesUsuario';

  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
  });
  constructor(private http: HttpClient) {}

  loginUsuario(mail: string, pass: string) {
    return this.http.post<Respuesta>(
      this.url,
      { email: mail, clave: pass },
      { headers: this.headers }
    );
  }

  registroUsuario(usuario: Usuario) {
    return this.http.post<Respuesta>(this.urlRegistro, usuario, {
      headers: this.headers,
    });
  }
  restablecerPassword(mail: string) {
    return this.http.post<Respuesta>(
      this.urlRstablecer,
      { email: mail },
      { headers: this.headers }
    );
  }
  modificarPassword(mail: string, clave: string) {
    return this.http.post<Respuesta>(
      this.urlCambiar,
      { email: mail, clave: clave },
      { headers: this.headers }
    );
  }

  modificarPasswordLogeado(id: number, clave: string) {
    return this.http.post<Respuesta>(
      this.urlCambiar,
      { idUsuario: id, clave: clave },
      { headers: this.headers }
    );
  }

  traerUsuarios() {
    return this.http.get<Respuesta>(this.urlListado);
  }

  traerPerfiles(perfil: number) {
    return this.http.post<Respuesta>(
      this.urlTraerPerfiles,
      { idPerfil: perfil },
      { headers: this.headers }
    );
  }

  darDeBajaUsuario(idUsuario: number) {
    return this.http.post<Respuesta>(
      this.urlBajaLogica,
      {
        idUsuario: idUsuario,
      },
      { headers: this.headers }
    );
  }

  darDeAltaUsuario(idUsuario: number) {
    return this.http.post<Respuesta>(
      this.urlAltaLogica,
      {
        idUsuario: idUsuario,
      },
      { headers: this.headers }
    );
  }

  asignarMaquina(id: number, idMaquina: number) {
    return this.http.post<Respuesta>(
      this.urlAsignarMaquina,
      { idUsuario: id, idMaquina: idMaquina },
      { headers: this.headers }
    );
  }

  asignarPerfil(id: string, idPerfil: string) {
    const idNumber = parseInt(id);
    const idPerfilNumber = parseInt(idPerfil);
    return this.http.post<Respuesta>(
      this.urlAsignarPerfil,
      { idUsuario: idNumber, idPerfil: idPerfilNumber },
      { headers: this.headers }
    );
  }
  traerPerfilesActuales(idUsuaro: number) {
    return this.http.post<Respuesta>(
      this.urlPerfilesActuales,
      { idUsuario: idUsuaro },
      { headers: this.headers }
    );
  }
}
