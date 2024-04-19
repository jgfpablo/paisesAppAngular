import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { PaisService } from '../../services/pais.service';
import { Paises } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrl: './ver-pais.component.css',
})
export class VerPaisComponent {
  respuesta: Paises | null = null;
  error: boolean = false;
  tipo: string = '';

  map: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.tipo = params['tipo'];
    });

    if (this.tipo == 'capital') {
      this.map = switchMap(({ id }) => this.paisService.buscarCapital(id));
      this.tipo = '';
    } else if (this.tipo == 'pais') {
      this.map = switchMap(({ id }) => this.paisService.buscarPais(id));
      this.tipo = '';
    } else {
      this.map = switchMap(({ id }) => this.paisService.buscarPais(id));
    }

    this.error = false;
    this.activatedRoute.params.pipe(this.map).subscribe(
      (resp: any) => {
        this.respuesta = resp[0];
        console.log(resp);
      },
      (err) => {
        this.error = true;
        console.log(err);
      }
    );
  }
}
