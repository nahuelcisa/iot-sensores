import { Component, OnInit } from '@angular/core';
import { MaquinaService } from 'src/app/services/maquina.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-dashboardmaquinas',
  templateUrl: './dashboardmaquinas.component.html',
  styleUrls: ['./dashboardmaquinas.component.scss'],
})
export class DashboardmaquinasComponent implements OnInit {
  public arrayMaquinas: any[] = [];
  public cantidadMaquinas: number = 0;
  public usuario!: Usuario;

  constructor(private maquinas: MaquinaService) {
    const local = localStorage.getItem('usuario');
    this.usuario = JSON.parse(local!);

    this.traerMaquinas();
  }

  ngOnInit(): void {}

  traerMaquinas() {
    this.maquinas
      .traerMaquinasAsignadas(this.usuario.idUsuario!)
      .subscribe((data) => {
        this.arrayMaquinas = data.array;
      });
  }
}
