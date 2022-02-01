import {
  Component,
  Input,
  OnInit,
  Output,
  OnDestroy,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() datoGuardar: any;

  @Input() usaSelect: boolean = false;

  @Input() arrayInput: any[] = [];

  @Input() objInput: any = {};

  @Output() modalCerrado: EventEmitter<object>;

  @Input() datosActualesUsuario: any[] = [];

  public valorSeleccionado: any;

  constructor() {
    this.modalCerrado = new EventEmitter();
  }

  ngOnInit(): void {
    if (this.datoGuardar != null && this.datoGuardar != undefined) {
      document.getElementById('botonClickear')?.click();
    }
  }

  cerrar() {
    this.modalCerrado.emit({ estado: false });
  }
  guardar() {
    this.modalCerrado.emit({
      estado: false,
      datoGuardar: this.datoGuardar,
      datoSeleccionado: this.valorSeleccionado,
    });
  }
  ngOnDestroy(): void {
    this.arrayInput = [];
    this.objInput = {};
  }
}
