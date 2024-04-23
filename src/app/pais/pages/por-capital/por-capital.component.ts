import { Component } from '@angular/core';

import { Paises } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrl: './por-capital.component.css',
})
export class PorCapitalComponent {
  respuesta: Paises[] = [];
  error: boolean = false;
  termino: string = '';
  busqueda: string = 'capital';

  recibir(res: Paises[]) {
    this.respuesta = []; //-------
    this.respuesta.push(...res);
  }
}
