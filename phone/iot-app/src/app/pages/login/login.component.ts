import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioModel } from '../../model/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public usuario = new UsuarioModel();
  apretado: boolean = false;

  constructor(private user: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.usuario.email = 'mailregistro@gmail.com';
    this.usuario.clave = 'claveregistro';
  }

  IniciarSesion() {
    this.apretado = true;

    this.user
      .loginUsuario(this.usuario.email, this.usuario.clave)
      .subscribe((resp) => {
        if (resp.success) {
          localStorage.setItem('usuario', JSON.stringify(resp.data));
          this.router.navigateByUrl('/home');
          this.apretado = false;
        }
      });
  }
}
