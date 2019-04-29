import { Component, OnInit, OnDestroy } from '@angular/core';
//Tipo de store
import { AppState } from '../../app.reducer';
//Servicio ingreso-egreso
import { IngresoEgresoService } from '../ingreso-egreso.service';
//Plugin alertas
import Swal from 'sweetalert2';
//Store Ngrx
import { Store } from '@ngrx/store';
//Modelo
import { IngresoEgreso } from '../ingreso-egreso.model';
//Rxjs subscription
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  public items: IngresoEgreso[];

  private items_subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoS: IngresoEgresoService
  ) { }

  ngOnDestroy(): void {
    this.items_subscription.unsubscribe();
  }

  ngOnInit() {
    this.items_subscription = this.store.select('ingresoEgreso').subscribe(ingresoEgreso => {
      // console.log("Ingreso-Egreso ->", ingresoEgreso.items);
      this.items = ingresoEgreso.items;

    });
  }

  public borrarItem(uid: string, nombre_item: string) {
    this.ingresoEgresoS.borrarIngresoEgreso(uid).then(() => {
      console.log("Se elimino el elemento ->", uid);
      Swal('Eliminado', nombre_item, 'success');

    }).catch(err => {
      console.error("Surgio un error al borrar el ingreso-egreso ->", err)
    })

  }

}
