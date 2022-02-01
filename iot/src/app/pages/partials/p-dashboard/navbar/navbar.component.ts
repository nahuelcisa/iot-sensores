import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../../interfaces/usuario.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public usuario: Usuario = JSON.parse(localStorage.getItem('usuario')!);

  constructor(private router: Router) {}

  ngOnInit(): void {}

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
