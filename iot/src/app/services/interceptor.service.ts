import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService {
  private tiempoPorDefectoEnCasoDeError: number = 5000;
  private swal = Swal;

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.swal.fire({
      icon: 'info',
      title: 'Cargando consulta...',
      timerProgressBar: true,
      timer: this.tiempoPorDefectoEnCasoDeError,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    return next.handle(req).pipe(
      finalize(() => {
        let obtenerTitulo = this.swal.getTitle()?.textContent;
        if (obtenerTitulo != 'Cargando consulta...') {
          this.swal.stopTimer();
        } else {
          this.swal.close();
        }
      })
    );
  }
}
