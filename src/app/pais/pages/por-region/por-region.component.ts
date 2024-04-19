import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Paises } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrl: './por-region.component.css',
})
export class PorRegionComponent {
  constructor(private paisService: PaisService) {}

  region: Paises[] = [];
  regionActual: string = '';
  regiones: string[] = ['africa', 'america', 'asia', 'europe', 'oceania'];
  error: boolean = false;
  termino: string = '';

  buscarRegion(termino: string) {
    this.error = false;
    this.regionActual = termino;
    this.termino = termino;
    this.paisService.buscarRegion(termino).subscribe(
      (resp) => {
        this.region = resp;
      },
      (err) => {
        this.error = true;
      }
    );
  }
}
