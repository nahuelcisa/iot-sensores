import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../../../interfaces/usuario.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public usuario: Usuario = JSON.parse(localStorage.getItem('usuario')!);
  constructor() {}

  ngOnInit(): void {}
}
