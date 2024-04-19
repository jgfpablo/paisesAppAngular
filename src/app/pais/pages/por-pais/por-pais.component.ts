import { Component, Input } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Paises } from '../../interfaces/paises.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrl: './por-pais.component.css',
})
export class PorPaisComponent {
  respuesta: Paises[] = [];
  error: boolean = false;
  termino: string = '';
  busqueda: string = 'pais';
  recibir(res: Paises[]) {
    this.respuesta.push(...res);
  }
}
