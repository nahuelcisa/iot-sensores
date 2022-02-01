import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['../shared/css/registro.css']
})
export class CambioClaveComponent implements OnInit, OnDestroy {
  restablecerForm: FormGroup = new FormGroup({});
  public urlGet : boolean = false;
  private email : string = "";
  public ingresado : boolean = false;
  public usuario! : Usuario;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
  ) {
    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['email'] != null){
        this.urlGet = true;
        this.crearFormularioPassword();
        this.email = params['email'];
      }else{
        this.urlGet = false;
        this.crearFormulario();
      }
    });

    if(localStorage.getItem('usuario')){
      this.ingresado = true;
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
      this.crearFormularioPassword();

    }else{
      this.ingresado = false;
    }
  }
  ngOnDestroy(): void{
    this.urlGet = false;
  }

  get emailValido() {
    return (
      this.restablecerForm.get('email')?.invalid &&
      this.restablecerForm.get('email')?.touched
    );
  }

  get passwordValido() {
    if(this.urlGet || this.ingresado){
      return (
        this.restablecerForm.get('password')?.invalid &&
        this.restablecerForm.get('password')?.touched
      );
    }else{
      return true;
    }
  }

  get controles() {
    return this.restablecerForm.controls;
  }

  crearFormulario() {
    
    this.restablecerForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.maxLength(50)],
      ]
    });
  }
  
  crearFormularioPassword() {
    
    this.restablecerForm = this.fb.group({
      password: [
        '',
        [Validators.required, Validators.maxLength(50)],
      ]
    });
    
  }

  restablecerPassword(){

    if (this.restablecerForm.invalid) {
      return Object.values(this.restablecerForm.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        }
        control.markAsTouched();
      });
    }
    if(this.urlGet && !this.ingresado){

      this.usuarioService
      .modificarPassword(this.email,this.controles.password.value)
      .subscribe((data) => {
        if (!data.success) {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error:',
            text: data.message,
          });
        } else {
          Swal.fire({
            icon: 'info',
            title: 'info:',
            text: data.message,
          }).then((result)=>{
            if(result.isConfirmed){
              this.router.navigate(['/login']);
            }
          });
        }
      });
    }else if(!this.urlGet && !this.ingresado){
      this.usuarioService
        .restablecerPassword(this.controles.email.value)
        .subscribe((data) => {
          if (!data.success) {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrió un error:',
              text: data.message,
            });
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Correo enviado:',
              text: data.message,
            }).then((result)=>{
              if(result.isConfirmed){
                this.router.navigate(['/login']);
              }
            });
          }
        });
    }

    if(this.ingresado){
      this.usuarioService
        .modificarPasswordLogeado(this.usuario.idUsuario!, this.controles.password.value)
        .subscribe((data) => {
          if (!data.success) {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrió un error:',
              text: data.message,
            });
          } else {
            Swal.fire({
              icon: 'info',
              title: 'mensaje',
              text: data.message,
            }).then((result)=>{
              if(result.isConfirmed){
                this.router.navigate(['/dashboard']);
              }
            });
          }
        });
    }
  }

}
