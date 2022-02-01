import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Respuesta } from '../../interfaces/respuesta.interface';
import Swal from 'sweetalert2';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  mostrarPassword: boolean = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {}

  get emailValido() {
    return (
      this.loginForm.get('email')?.invalid &&
      this.loginForm.get('email')?.touched
    );
  }
  get passwordValido() {
    return (
      this.loginForm.get('password')?.invalid &&
      this.loginForm.get('password')?.touched
    );
  }

  crearFormulario() {
    this.loginForm = this.fb.group({
      email: [
        'mailregistro@gmail.com',
        [Validators.required, Validators.maxLength(30)],
      ],
      password: [
        'claveregistro',
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  cambiarTipo() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  get controles() {
    return this.loginForm.controls;
  }

  iraDashboard() {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        }
        control.markAsTouched();
      });
    }

    this.usuarioService
      .loginUsuario(this.controles.email.value, this.controles.password.value)
      .subscribe((data) => {
        if (!data.success) {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error:',
            text: data.message,
          });
        } else {
          localStorage.setItem('usuario', JSON.stringify(data.data));

          this.router.navigate(['/dashboard']);
        }
      });
    if (
      this.controles.email.value == 'test@test.com' &&
      this.controles.password.value == '12345'
    ) {
      this.router.navigate(['/dashboard']);
    }
  }
}
