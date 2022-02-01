import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { MaquinasService } from '../../services/maquinas.service';
import { Dispositivo } from '../../interfaces/dispositivo.interface';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.component.html',
  styleUrls: ['./dispositivos.component.scss'],
})
export class DispositivosComponent implements OnInit {
  public arrayDispositivos: any[] = [];
  private usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));

  constructor(private maquinas: MaquinasService) {
    this.traerMaquinas();
  }

  ngOnInit() {}

  traerMaquinas() {
    this.maquinas
      .traerMaquinasAsignadas(this.usuario.idUsuario!)
      .subscribe((data) => {
        console.log(data);
        this.arrayDispositivos = data.array;
      });
  }
}
