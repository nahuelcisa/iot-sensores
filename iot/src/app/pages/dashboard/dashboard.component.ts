import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaquinaService } from 'src/app/services/maquina.service';

import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public usuario!: Usuario;
  public cantidadMaquinas: number = 0;

  constructor(private router: Router, public maquinas: MaquinaService) {
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
      });
  }
}
