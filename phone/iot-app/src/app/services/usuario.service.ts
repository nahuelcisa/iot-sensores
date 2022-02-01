import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario.interface';
import { Respuesta } from '../interfaces/respuesta.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = environment.apiUrl + 'login';
  private urlRegistro: string = environment.apiUrl + 'usuario/registro';
  private urlRstablecer: string = environment.apiUrl + 'restablecer';

  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
  });

  constructor( private http: HttpClient ) {

   }

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
}
