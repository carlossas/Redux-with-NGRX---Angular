import { Component, OnInit } from '@angular/core';
//Rxjs
import { Subscription } from 'rxjs';
//Ngrx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
//Modelo
import { IngresoEgreso } from '../ingreso-egreso.model';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  public ingresos: number = 0;
  public egresos: number = 0;

  public cantidadIngresos: number = 0;
  public cantidadEgresos: number = 0;

  private subscription: Subscription = new Subscription();

  // Grafico Donas
  public donaInfo: string[] = ['Ingresos', 'Egresos'];
  public donaData: number[] = [];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso').subscribe(ingresoEgreso => {
      this.contarIngresoEgreso(ingresoEgreso.items);
    });
  }

  private contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.cantidadIngresos = 0;
    this.cantidadEgresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.cantidadIngresos++;
        this.ingresos += item.monto;
      }

      if (item.tipo === 'egreso') {
        this.cantidadEgresos++;
        this.egresos += item.monto;
      }

    });

    this.donaData = [this.ingresos, this.egresos];

  }

}
