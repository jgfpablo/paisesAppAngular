import { Component, Input } from '@angular/core';
import { Paises } from '../../interfaces/paises.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
})
export class TablaComponent {
  @Input() pais: Paises[] = [];
  tabla: Paises[] = [];
  @Input() error: boolean = false;
  @Input() termino: string = '';

  count: number = 0;
  count2: number = 5;

  handlePageEvent(pageEvent: PageEvent) {
    const previousPageIndex = pageEvent.previousPageIndex ?? 0;
    if (pageEvent.pageIndex > previousPageIndex) {
      this.count = this.count + pageEvent.pageSize;
      this.count2 = this.count2 + pageEvent.pageSize;
    } else {
      this.count = this.count - pageEvent.pageSize;
      this.count2 = this.count2 - pageEvent.pageSize;
    }
  }
}
