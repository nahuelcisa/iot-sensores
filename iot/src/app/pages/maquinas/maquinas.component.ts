import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaquinaService } from 'src/app/services/maquina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.scss']
})
export class MaquinasComponent implements OnInit {

  idDevice : string = "";
  altaForm : FormGroup = new FormGroup({});

  constructor(
    private maquina : MaquinaService,
    private router : Router,
    private fb: FormBuilder
  ) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.altaForm = this.fb.group({
      idDevice: [
        '',
        [Validators.required, Validators.maxLength(30)],
      ]
    });
  }

  get controles() {
    return this.altaForm.controls;
  }

  altaMaquina(){
    let maquina = {
      idDevice : this.controles.idDevice.value
    }
    this.maquina.altaMaquina(maquina).subscribe((data) => {
      if (!data.success) {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error:',
          text: data.message,
        });
      } else {
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
