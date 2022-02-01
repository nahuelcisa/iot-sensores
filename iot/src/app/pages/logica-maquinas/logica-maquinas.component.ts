import { Component, OnInit } from '@angular/core';
import { MaquinaService } from 'src/app/services/maquina.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-logica-maquinas',
  templateUrl: './logica-maquinas.component.html',
  styleUrls: ['./logica-maquinas.component.scss']
})
export class LogicaMaquinasComponent implements OnInit {

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
      .traerMaquinas()
      .subscribe((data) => {
        this.arrayMaquinas = data.array;
      });
  }

  habilitar(idMaquina : string): void{
    this.maquinas
    .habilitarMaquina(idMaquina)
    .subscribe((data) => {

      if(data.success){
        location.reload();
        console.log("funca baja");
        console.log(data);
      }
    });
  }

  deshabilitar(idMaquina : string): void{
    this.maquinas
    .deshabilitarMaquina(idMaquina)
    .subscribe((data) => {
      if(data.success){
        location.reload();
        console.log("funca baja");
        console.log(data);
      }
    });
  }
}
