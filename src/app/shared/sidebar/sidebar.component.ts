import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  sidebarVisible: boolean = false;

  items: MenuItem[] = [
    {
      label: 'Buscar Pais',
      routerLink: '""',
      command: () => {
        this.sidebarVisible = false;
      },
    },
    {
      label: 'Buscar Capital',
      routerLink: 'capital',
      command: () => {
        this.sidebarVisible = false;
      },
    },
    {
      label: 'Buscar Region',
      routerLink: 'region',
      command: () => {
        this.sidebarVisible = false;
      },
    },
  ];
}
