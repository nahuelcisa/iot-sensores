import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['../shared/css/registro.css'],
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup = new FormGroup({});

  mostrarPassword: boolean = false;

  constructor(
    private router: Router,
    private registro: UsuarioService,
    private fb: FormBuilder
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {}

  crearFormulario() {
    this.registroForm = this.fb.group({
      email: [
        'mailregistro1231312@gmail.com',
        [Validators.required, Validators.maxLength(50)],
      ],
      password: [
        'claveregistro',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      nombre: [
        'nombreTest',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      apellido: [
        'apellidoTest',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  cambiarTipo() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  get controles() {
    return this.registroForm.controls;
  }

  get emailValido() {
    return (
      this.registroForm.get('email')?.invalid &&
      this.registroForm.get('email')?.touched
    );
  }
  get nombreValido() {
    return (
      this.registroForm.get('nombre')?.invalid &&
      this.registroForm.get('nombre')?.touched
    );
  }
  get passwordValido() {
    return (
      this.registroForm.get('password')?.invalid &&
      this.registroForm.get('password')?.touched
    );
  }
  get apellidoValido() {
    return (
      this.registroForm.get('apellido')?.invalid &&
      this.registroForm.get('apellido')?.touched
    );
  }

  irALogin() {
    const usuario: Usuario = {
      nombre: this.controles.nombre.value,
      apellido: this.controles.apellido.value,
      email: this.controles.email.value,
      clave: this.controles.password.value,
      idPerfil: null,
      idUsuario: null,
      habilitado: null,
      perfil: null,
    };

    this.registro.registroUsuario(usuario).subscribe((data) => {
      if (!data.success) {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error:',
          text: data.message,
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
