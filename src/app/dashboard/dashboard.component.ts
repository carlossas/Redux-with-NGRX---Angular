import { Component, OnInit } from '@angular/core';
//Servicios
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(public ingresoEgresoS: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoEgresoS.initIngresoEgresoListener();
  }

}
