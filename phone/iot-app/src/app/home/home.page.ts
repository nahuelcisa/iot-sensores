import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
 

  constructor(private menu: MenuController, private router : Router) {}

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
