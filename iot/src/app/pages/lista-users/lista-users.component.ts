import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Respuesta } from 'src/app/interfaces/respuesta.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { MaquinaService } from '../../services/maquina.service';
import { delay, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-lista-users',
  templateUrl: './lista-users.component.html',
  styleUrls: ['./lista-users.component.scss'],
})
export class ListaUsersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  public arrayDatosActualUsuario: any[] = [];

  private usuarioLogueado: Usuario = JSON.parse(
    localStorage.getItem('usuario')!
  );

  public usuarioId: number = 0;
  public maquinaId: number = 0;
  public perfilId: number = 0;

  public cargado: boolean = false;

  public usuarios: Usuario[] = Array();
  public datosEnviarModal: any[] = [];
  public perfiles: any[] = [];

  public perfilConDatos: boolean = false;
  public mandarModal: boolean = false;

  public objEnviarAModal: any;

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private user: UsuarioService, private maquina: MaquinaService) {
    this.user.traerUsuarios().subscribe((data) => {
      this.usuarios = data.array;
      this.dtTrigger.next();
      this.cargado = true;
      this.mandarModal = false;
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
      },
      pagingType: 'full_numbers',
    };
  }

  mostrarModal(idUsuario: number, opcion: string) {
    if (opcion == 'maquina') {
      this.maquina.traerMaquinas().subscribe((data) => {
        data.array.forEach((maquina: any) => {
          this.datosEnviarModal.push({
            valor: maquina.idMaquina,
            campoVisible: maquina.idDevice,
          });
        });
      });
      this.maquina.traerMaquinasAsignadas(idUsuario).subscribe((data) => {
        data.array.forEach((maquina: any) => {
          this.arrayDatosActualUsuario.push(maquina.idDevice);
        });
        this.mandarModal = true;
      });
    } else {
      this.user
        .traerPerfiles(this.usuarioLogueado.idPerfil!)
        .subscribe((data) => {
          data.array.forEach((perfil: any) => {
            this.datosEnviarModal.push({
              valor: perfil.id,
              campoVisible: perfil.perfil,
            });
          });
        });

      this.user.traerPerfilesActuales(idUsuario).subscribe((data) => {
        data.array.forEach((perfil: any) => {
          this.arrayDatosActualUsuario.push(perfil.perfil);
        });
        this.mandarModal = true;
      });
    }
    this.objEnviarAModal = {
      valorEnviar: idUsuario,
      caso: opcion,
    };
  }
  obtenerInfoModal(resp: any) {
    if (resp.datoSeleccionado != null || resp.datoSeleccionado != undefined) {
      if (resp.datoGuardar.caso == 'maquina') {
        this.realizarAsignaciones(
          this.user.asignarMaquina(
            resp.datoGuardar.valorEnviar,
            resp.datoSeleccionado
          )
        );
      } else {
        this.realizarAsignaciones(
          this.user.asignarPerfil(
            resp.datoGuardar.valorEnviar,
            resp.datoSeleccionado
          )
        );
      }
    }

    this.mandarModal = resp.estado;
    this.datosEnviarModal = [];
    this.arrayDatosActualUsuario = [];
  }

  bajaLogica(idUsuario: number) {
    this.realizarConsulta(this.user.darDeBajaUsuario(idUsuario), 'baja');
  }
  altaLogica(idUsuario: number) {
    this.realizarConsulta(this.user.darDeAltaUsuario(idUsuario), 'alta');
  }

  realizarConsulta(metodo: Observable<Respuesta>, titulo: string) {
    Swal.fire({
      icon: 'info',
      title: '¿Está seguro de que desea dar de ' + titulo + ' a este usuario?',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Dar de ' + titulo,
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        metodo.subscribe((data: Respuesta) => {
          if (!data.success) {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrió un error:',
              text: data.message,
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Información:',
              text: data.message,
            }).then((resp) => {
              if (resp.isConfirmed) {
                location.reload();
              }
            });
          }
        });
      }
    });
  }

  realizarAsignaciones(metodo: Observable<Respuesta>) {
    metodo.subscribe((data) => {
      if (!data.success) {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error:',
          text: data.message,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Información:',
          text: data.message,
        }).then((resp) => {
          if (resp.isConfirmed) {
            location.reload();
          }
        });
      }
      this.mandarModal = false;
    });
  }
}
