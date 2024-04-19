import { Component, Input } from '@angular/core';
import { Paises } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
})
export class TablaComponent {
  @Input() pais: Paises[] = [];
  @Input() error: boolean = false;
  @Input() termino: string = '';
}
