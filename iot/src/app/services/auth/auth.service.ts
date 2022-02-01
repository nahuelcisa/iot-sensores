import { Injectable } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private itemlocal = localStorage.getItem('usuario');

  private local: Usuario = JSON.parse(this.itemlocal!);
  constructor() {}

  estaLogueado(): boolean {
    if (
      this.local.idPerfil == null ||
      this.local == null ||
      this.local.idUsuario == null ||
      this.local.nombre == null
    ) {
      return false;
    } else {
      return true;
    }
  }

  tieneAcceso(): boolean {
    const itemlocal = localStorage.getItem('usuario');

    const local: Usuario = JSON.parse(itemlocal!);
    if (local.idPerfil != 3) {
      return true;
    } else {
      return false;
    }
  }
}
