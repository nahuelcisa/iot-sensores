import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { MaquinaService } from 'src/app/services/maquina.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../shared/css/profile.css'],
})
export class ProfileComponent implements OnInit {
  usuario!: Usuario;
  public cantidadMaquinas: number = 0;

  public cargado = false;

  constructor(public maquinas: MaquinaService) {
    const local = localStorage.getItem('usuario');
    this.usuario = JSON.parse(local!);
    this.traerMaquinas();
  }

  ngOnInit(): void {}

  traerMaquinas() {
    this.maquinas
      .traerCantidadMaquinas(this.usuario.idUsuario!)
      .subscribe((data) => {
        this.cantidadMaquinas = data.array.length;
        this.cargado = true;
      });
  }
}
