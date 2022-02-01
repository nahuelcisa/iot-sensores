import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, ModalComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [NavbarComponent, SidebarComponent, ModalComponent],
})
export class PDashboardModule {}
