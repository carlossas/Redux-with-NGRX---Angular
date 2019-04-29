import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//Modelos
import { IngresoEgreso } from './ingreso-egreso.model';
//Servicio de ingresos y egresos
import { IngresoEgresoService } from './ingreso-egreso.service';
//Plugin alertas
import Swal from 'sweetalert2';
//Redux
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
//Acciones
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  public form: FormGroup;
  public tipo: string = "ingreso";

  constructor(
    public ingresoEgresoS: IngresoEgresoService,
    private store: Store<AppState>,

  ) { }

  ngOnInit() {

    this.prepararFormulario();

  }

  //Iniciamos el formulario con las validaciones de reactive forms
  private prepararFormulario(): void {
    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(null, Validators.min(0.1)),
    })
  }

  //Crear un nuevo ingreso o egreso en la base de datos
  public crearIngresoEgreso() {

    this.store.dispatch(new ActivarLoadingAction());

    const ingresoEgreso = new IngresoEgreso({ ...this.form.value, tipo: this.tipo });
    this.ingresoEgresoS.crearIngresoEgreso(ingresoEgreso).then(() => {
      console.log("Nuevo ingreso-egreso ->", ingresoEgreso);
      this.form.reset();
      this.store.dispatch(new DesactivarLoadingAction());
      Swal('Correcto', 'El ingreso-egreso se grabo exitosamente', 'success');

    }).catch(err => {
      this.store.dispatch(new DesactivarLoadingAction());
      console.error("Error al grabar ingreso-egreso ->", err);
      Swal('Error', err, 'error');

    });


  }


}
