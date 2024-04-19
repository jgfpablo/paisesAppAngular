import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, map, Subject, tap } from 'rxjs';
import { Paises } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrl: './pais-input.component.css',
})
export class PaisInputComponent implements OnInit {
  @Output() respuesta: EventEmitter<Paises[]> = new EventEmitter<Paises[]>();
  @Input() tipo: string = '';
  debouncer: Subject<string> = new Subject();
  termino: string = '';
  spiner: boolean = false;
  resp: any[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}
  ngOnInit() {
    this.debouncer
      .pipe(
        tap(() => {
          this.spiner = true;
        }),
        debounceTime(300)
      )
      .subscribe((valor) => {
        this.spiner = false;
        this.sugerencias(valor);
      });
  }

  teclaPresionada() {
    this.termino = this.termino.replace(/\b\w/g, (char) => char.toUpperCase());
    this.debouncer.next(this.termino);
  }

  sugerencias(termino: string) {
    let servicio;
    if (termino != '') {
      this.termino = termino;
      this.mostrarSugerencias = true;
      if (this.tipo == 'pais') {
        servicio = this.paisService.buscarPais(termino);
      } else {
        servicio = this.paisService.buscarCapital(termino);
      }

      servicio
        .pipe(
          map((res: Paises[]) => {
            let resFilt;
            if (this.tipo == 'capital') {
              resFilt = res.filter((capital) =>
                capital.capital[0].includes(termino)
              );
            } else {
              resFilt = res.filter((pais) =>
                pais.name.common.includes(termino)
              );
            }
            return resFilt.slice(0, 3);
          }),

          map((res) => {
            let resFilt = [];

            if (this.tipo == 'capital') {
              for (let index = 0; index < res.length; index++) {
                resFilt.push(res[index].capital[0]);
              }
            } else {
              for (let index = 0; index < res.length; index++) {
                resFilt.push(res[index].name.common);
              }
            }

            return resFilt;
          })
        )
        .subscribe(
          (res) => {
            return (this.resp = res);
          },
          (error) => {
            console.log(`Error ${this.tipo} no encontrada`);
          }
        );
    }
    this.resp = [];
  }

  buscar() {
    if (this.tipo == 'pais') {
      this.paisService.buscarPais(this.termino).subscribe((res) => {
        this.respuesta.emit(res);
        console.log(this.respuesta);
      });
      this.termino = '';
      this.mostrarSugerencias = false;
    } else {
      this.paisService.buscarCapital(this.termino).subscribe((res) => {
        this.respuesta.emit(res);
        console.log(this.respuesta);
      });
      this.termino = '';
      this.mostrarSugerencias = false;
    }
  }
}
